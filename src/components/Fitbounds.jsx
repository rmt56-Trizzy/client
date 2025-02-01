import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

function FitBounds({ markers, padding = [50, 50] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      // Membuat bounds dari semua koordinat marker
      const bounds = L.latLngBounds(markers.map(marker => marker.coordinate));
      map.fitBounds(bounds, { padding });
    }
  }, [markers, map, padding]);

  return null;
}

export default FitBounds;
