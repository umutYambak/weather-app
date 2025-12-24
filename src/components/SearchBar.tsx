import React, { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions } from '../services/cityService';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  handleSearch: (forcedName?: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, handleSearch, loading }) => {
  const [suggestions, setSuggestions] = useState<{ name: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklandığında listeyi kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Yazmaya başlayınca önerileri getir
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (city.trim().length >= 1 && showDropdown) {
        const results = await fetchCitySuggestions(city);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 200); // Hızlı tepki için 200ms

    return () => clearTimeout(timer);
  }, [city, showDropdown]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setShowDropdown(true);
  };

  const handleSuggestionClick = (cityName: string) => {
    setCity(cityName);
    setSuggestions([]);
    setShowDropdown(false);
    handleSearch(cityName); // Seçildiği an aramayı başlat
  };

  return (
    <div className="search-wrapper" ref={dropdownRef}>
      <div className="search-input-box">
        <input
          type="text"
          value={city}
          onChange={onInputChange}
          onFocus={() => city.length >= 1 && setShowDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
              setShowDropdown(false);
            }
          }}
          placeholder="Şehir ara..."
          className="search-input"
        />
        <button onClick={() => handleSearch()} disabled={loading} className="search-btn">
          {loading ? '...' : '🔍'}
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item.name)} className="suggestion-item">
              📍 {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;