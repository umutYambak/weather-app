import { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast, fetchAltitude, fetchWeatherByCoords } from '../services/weatherService';
import type { WeatherData, ForecastData } from '../types/weather';

export interface CompareData { weather: WeatherData; forecast: ForecastData; }

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [primary, setPrimary] = useState<CompareData | null>(null);
  const [secondary, setSecondary] = useState<CompareData | null>(null);
  const [topCities, setTopCities] = useState<{name: string, count: number}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cityScores');
    if (saved) setTopCities(JSON.parse(saved));
  }, []);

  const updateScore = (name: string) => {
    const newScores = [...topCities.filter(c => c.name !== name), 
      { name, count: (topCities.find(c => c.name === name)?.count || 0) + 1 }
    ].sort((a, b) => b.count - a.count).slice(0, 5);
    setTopCities(newScores);
    localStorage.setItem('cityScores', JSON.stringify(newScores));
  };

  const getFullData = async (lat: number, lon: number) => {
    setLoading(true); // Başlat
    try {
      const [w, a, f] = await Promise.all([fetchWeatherByCoords(lat, lon), fetchAltitude(lat, lon), fetchForecast(lat, lon)]);
      updateScore(w.name);
      return { weather: { ...w, altitude: a }, forecast: f };
    } finally {
      setLoading(false); // Bitir
    }
  };

  const getFullDataByName = async (name: string) => {
    setLoading(true); // Başlat
    try {
      const w = await fetchWeather(name);
      const [a, f] = await Promise.all([fetchAltitude(w.coord.lat, w.coord.lon), fetchForecast(w.coord.lat, w.coord.lon)]);
      updateScore(w.name);
      return { weather: { ...w, altitude: a }, forecast: f };
    } finally {
      setLoading(false); // Bitir
    }
  };

  return { primary, setPrimary, secondary, setSecondary, topCities, getFullData, getFullDataByName, loading };
};