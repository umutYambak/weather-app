import React from 'react';

interface Props {
  city: string;
  setCity: (val: string) => void;
  handleSearch: () => void;
  loading: boolean;
}

const SearchBar: React.FC<Props> = ({ city, setCity, handleSearch, loading }) => (
  <div style={{
    display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '15px', padding: '10px 20px', border: '1px solid rgba(255, 255, 255, 0.1)'
  }}>
    <input
      type="text" placeholder="Şehir ara..." value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
    />
    <button onClick={handleSearch} disabled={loading} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 15px', cursor: 'pointer' }}>
      {loading ? '...' : 'Ara'}
    </button>
  </div>
);

export default SearchBar;