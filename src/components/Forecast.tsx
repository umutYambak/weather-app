import React from 'react';
import type { ForecastData } from '../types/weather';

const Forecast: React.FC<{ forecast: ForecastData }> = ({ forecast }) => {
  const getDailyForecast = () => {
    const dailyData: any[] = [];
    const seenDays = new Set();
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('tr-TR');
      if (!seenDays.has(date)) {
        dailyData.push(item);
        seenDays.add(date);
      }
    });
    return dailyData.slice(0, 7);
  };

  return (
    <div style={{ 
      background: 'rgba(0, 0, 0, 0.4)', 
      padding: '20px', 
      borderRadius: '25px', 
      border: '1px solid rgba(255, 255, 255, 0.05)', 
      backdropFilter: 'blur(10px)',
      marginTop: 'auto'
    }}>
      <h4 style={{ margin: '0 0 15px 0', fontSize: '0.8rem', color: '#64748b', textAlign: 'center', fontWeight: 700, letterSpacing: '1px' }}>HAFTALIK GÖRÜNÜM</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', overflowX: 'auto' }}>
        {getDailyForecast().map((day) => (
          <div key={day.dt} style={{ flex: '1', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 5px', borderRadius: '15px', minWidth: '60px' }}>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{new Date(day.dt * 1000).toLocaleDateString('tr-TR', { weekday: 'short' })}</div>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" style={{width: '30px'}} />
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{Math.round(day.main.temp)}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;