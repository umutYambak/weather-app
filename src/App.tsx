import { useState} from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import { fetchWeather, fetchForecast, fetchAltitude, fetchWeatherByCoords } from './services/weatherService';
import type { WeatherData, ForecastData } from './types/weather';

// Harita olaylarını dinleyen yardımcı bileşen
function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);

  const getTheme = (main: string | undefined) => {
    if (!main) return '#020617';
    const themes: Record<string, string> = { 
      Clear: 'linear-gradient(180deg, #020617 0%, #075985 100%)',
      Clouds: 'linear-gradient(180deg, #020617 0%, #334155 100%)',
      Rain: 'linear-gradient(180deg, #020617 0%, #1e3a8a 100%)',
      Thunderstorm: 'linear-gradient(180deg, #020617 0%, #1e1b4b 100%)',
      Snow: 'linear-gradient(180deg, #020617 0%, #475569 100%)'
    };
    return themes[main] || '#020617';
  };

// HARİTAYA TIKLAYINCA
const handleMapClick = async (lat: number, lng: number) => {
  if (loading) return; 
  setLoading(true);
  try {
    const w = await fetchWeatherByCoords(lat, lng);
    const a = await fetchAltitude(lat, lng);
    // Burası hep 2 parametre (lat, lng) alacak
    const f = await fetchForecast(lat, lng); 
    
    setWeather({ ...w, altitude: a });
    setForecast(f);
    setCity(w.name);
  } catch (err) {
    console.error("Harita Hatası:", err);
  } finally {
    setLoading(false); // Kilit her durumda açılır
  }
};

// ARAMA YAPINCA
const handleSearch = async () => {
  if (!city.trim() || loading) return;
  setLoading(true);
  try {
    // 1. Önce şehri bul (Bu bize koordinatları getirecek: w.coord.lat, w.coord.lon)
    const w = await fetchWeather(city);
    
    // 2. Şehirden gelen koordinatlarla diğer verileri çek
    const a = await fetchAltitude(w.coord.lat, w.coord.lon);
    const f = await fetchForecast(w.coord.lat, w.coord.lon); 
    
    setWeather({ ...w, altitude: a });
    setForecast(f);
  } catch (err) {
    console.error("Arama Hatası:", err);
    alert("Şehir bulunamadı veya bir hata oluştu!");
  } finally {
    setLoading(false); // Kilit her durumda açılır
  }
};
  return (
    <div className="app-container">
      {/* SOL PANEL */}
      <div className="sidebar" style={{ 
        background: weather ? getTheme(weather.weather[0].main) : '#020617',
        justifyContent: weather ? 'space-between' : 'flex-start'
      }}>
        <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} loading={loading} />
        {weather && (
          <>
            <WeatherDisplay weather={weather} />
            <WeatherDetails weather={weather} />
            {forecast && <Forecast forecast={forecast} />}
          </>
        )}
      </div>

      {/* SAĞ PANEL (HARİTA) */}
      <div className="map-section">
        <MapContainer 
          center={[39, 35]} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <MapEvents onMapClick={handleMapClick} />
          {weather && (
            <Marker 
              position={[weather.coord.lat, weather.coord.lon]} 
              interactive={false} 
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;