import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useWeather } from './hooks/useWeather';
import { MapController, MapEvents } from './components/MapElements';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import WeatherAnimation from './components/WeatherAnimation';
import './App.css';

export default function App() {
  const { primary, setPrimary, secondary, setSecondary, topCities, getFullData, getFullDataByName, loading } = useWeather();
  const [city, setCity] = useState("");
  const [target, setTarget] = useState<1 | 2>(1);
  const [center, setCenter] = useState<[number, number]>([39, 35]);

  const onSearch = async (name?: string) => {
    try {
      const data = await getFullDataByName(name || city);
      if (target === 1) { setPrimary(data); setSecondary(null); setCenter([data.weather.coord.lat, data.weather.coord.lon]); }
      else setSecondary(data);
      setCity("");
    } catch { alert("Hata!"); }
  };

  const onMapAction = async (lat: number, lon: number, isSec: boolean) => {
    const data = await getFullData(lat, lon);
    if (isSec) { setSecondary(data); setTarget(2); } 
    else { setPrimary(data); setSecondary(null); setCenter([lat, lon]); setTarget(1); }
  };

  return (
    <div className={`app-container ${secondary ? 'compare-mode' : ''}`}>
      <aside className="sidebar">
        <WeatherAnimation type={primary?.weather.weather[0].main} />
        <div className="sidebar-main-wrapper">
          <header className="search-controls">
            <div className="target-toggle">
              {[1, 2].map(num => (
                <button key={num} className={target === num ? 'active' : ''} onClick={() => setTarget(num as 1 | 2)}>
                  {num}. Şehir {num === 2 && "(Ekle)"}
                </button>
              ))}
            </div>
            <SearchBar city={city} setCity={setCity} handleSearch={() => onSearch()} loading={loading} />
            <div className="top-cities-box">
              {topCities.map((c, i) => (
                <button key={c.name} className="top-city-tag" onClick={() => onSearch(c.name)}>
                  <span className="rank">{i+1}.</span> {c.name} <span className="count-badge">{c.count}</span>
                </button>
              ))}
            </div>
          </header>

          <main className="compare-grid">
            {[primary, secondary].map((data, i) => data && (
              <div key={i} className={`city-column ${i === 1 ? 'secondary-column' : ''}`}>
                <p className="column-label">{i === 0 ? 'ANA ŞEHİR' : 'KARŞILAŞTIRILAN'}</p>
                <WeatherDisplay weather={data.weather} />
                <WeatherDetails weather={data.weather} />
                <Forecast forecast={data.forecast} />
                {i === 1 && <button className="close-compare-btn" onClick={() => setSecondary(null)}>Kapat</button>}
              </div>
            ))}
          </main>
        </div>
      </aside>

      <section className="map-section">
        <MapContainer center={center} zoom={6} style={{ height: '100%' }}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <MapController center={center} />
          <MapEvents onSelect={onMapAction} />
          {primary && <Marker position={[primary.weather.coord.lat, primary.weather.coord.lon]} />}
          {secondary && <Marker position={[secondary.weather.coord.lat, secondary.weather.coord.lon]} />}
        </MapContainer>
      </section>
    </div>
  );
};