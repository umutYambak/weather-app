import React from 'react';
import type { WeatherData } from '../types/weather';

const WeatherDisplay: React.FC<{ weather: WeatherData }> = ({ weather }) => (
  <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '10px 0' }}>{weather.name}</h1>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '6rem', fontWeight: 200 }}>{Math.round(weather.main.temp)}°</span>
      <img className="weather-float" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} style={{ width: '120px' }} alt="icon" />
    </div>
    <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginTop: '-15px', textTransform: 'capitalize' }}>
      {weather.weather[0].description}
    </p>
  </div>
);

export default WeatherDisplay;