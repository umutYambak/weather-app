import { useEffect, useState } from 'react';
import { useMap, useMapEvents, Marker } from 'react-leaflet';

export const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => { map.flyTo(center, 10); setTimeout(() => map.invalidateSize(), 600); }, [center, map]);
  return null;
};

export const MapEvents = ({ onSelect }: { onSelect: (lat: number, lng: number, isSecondary: boolean) => void }) => {
  const [pos, setPos] = useState({ lat: 0, lng: 0 });
  useMapEvents({
    mousemove: (e) => setPos(e.latlng),
    click: (e) => onSelect(e.latlng.lat, e.latlng.lng, false),
    keydown: (e) => { if (e.originalEvent.key === '2') onSelect(pos.lat, pos.lng, true); }
  });
  return null;
};