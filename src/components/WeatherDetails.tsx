import React from 'react';
import type { WeatherData } from '../types/weather';

const InfoCard = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <div style={{
    background: 'rgba(0, 0, 0, 0.3)', padding: '12px 5px', borderRadius: '18px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '4px', border: '1px solid rgba(255, 255, 255, 0.05)'
  }}>
    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
    <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{value}</span>
  </div>
);

const WeatherDetails: React.FC<{ weather: WeatherData }> = ({ weather }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '20px 0' }}>
    <InfoCard icon="🌡️" label="Hiss." value={`${Math.round(weather.main.feels_like)}°C`} />
    <InfoCard icon="💧" label="Nem" value={`%${weather.main.humidity}`} />
    <InfoCard icon="💨" label="Rüzgar" value={`${weather.wind.speed}km/h`} />
    <InfoCard icon="⏲️" label="Basınç" value={`${weather.main.pressure}`} />
    <InfoCard icon="⛰️" label="Rakım" value={`${Math.round(weather.altitude || 0)}m`} />
    <InfoCard icon="🌅" label="G.Doğ" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString('tr-TR', {hour:'2-digit', minute:'2-digit'})} />
    <InfoCard icon="🌇" label="G.Bat" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString('tr-TR', {hour:'2-digit', minute:'2-digit'})} />
    <InfoCard icon="🌍" label="Ülke" value={weather.sys.country} />
  </div>
);

export default WeatherDetails;