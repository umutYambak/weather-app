const API_KEY = "bf8578580d9d70b8788e1362c1a3a3a7";

export const fetchWeather = async (city: string) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`);
  return res.json();
};

// 1. Koordinatla Hava Durumu
export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`);
  if (!res.ok) throw new Error("Hava durumu alınamadı");
  return res.json();
};

// 2. İsimle Hava Durumu
export const fetchWeatherByCity = async (city: string) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`);
  if (!res.ok) throw new Error("Şehir bulunamadı");
  return res.json();
};

// 3. KOORDİNATLA TAHMİN (En güvenlisi bu)
export const fetchForecast = async (lat: number, lon: number) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`);
  if (!res.ok) throw new Error("Tahmin alınamadı");
  return res.json();
};

// 4. Rakım
export const fetchAltitude = async (lat: number, lon: number) => {
  const res = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`);
  const data = await res.json();
  return data.elevation?.[0] || 0;
};