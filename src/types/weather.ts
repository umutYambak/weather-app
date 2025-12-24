// src/types/weather.ts
export interface WeatherData {
  name: string;
  coord: { lat: number; lon: number };
  weather: { main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  altitude?: number; // Opsiyonel
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: { temp: number };
    weather: Array<{ icon: string; description: string }>;
    dt_txt: string;
  }>;
}