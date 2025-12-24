import React from 'react';
import './WeatherAnimation.css';

interface Props { type: string | undefined; }

const WeatherAnimation: React.FC<Props> = ({ type }) => {
  if (!type) return null;

  const getCount = () => {
    switch (type) {
      case 'Rain': return 40;
      case 'Snow': return 40;
      case 'Clouds': return 10;
      case 'Mist': case 'Fog': return 15;
      default: return 8;
    }
  };

  const elements = Array.from({ length: getCount() });

  return (
    <div className={`weather-ani-container ${type.toLowerCase()}`}>
      {elements.map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${2 + Math.random() * 4}s`,
          opacity: Math.random()
        }} />
      ))}
    </div>
  );
};

export default WeatherAnimation;