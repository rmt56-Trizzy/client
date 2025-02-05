import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

function FitBounds({ markers, padding = [50, 50] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((marker) => marker.coordinate));
      map.fitBounds(bounds, { padding });
    }
  }, [markers, map, padding]);

  return null;
}

export default FitBounds;

FitBounds.propTypes = {
  markers: PropTypes.array,
  padding: PropTypes.array,
};
