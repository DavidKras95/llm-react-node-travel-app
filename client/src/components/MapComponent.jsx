import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const MapComponent = ({ travelDays }) => {
  const firstDayStart = [travelDays[0].start.lat, travelDays[0].start.lng];

  const polylinePositions = travelDays.map(day => [
    [day.start.lat, day.start.lng],
    [day.stop.lat, day.stop.lng],
  ]);

  const lineLabels = travelDays.map(day => {
    const midLat = (day.start.lat + day.stop.lat) / 2;
    const midLng = (day.start.lng + day.stop.lng) / 2;
    return [midLat, midLng];
  });

  return (
    <MapContainer center={firstDayStart} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {travelDays.map((day, index) => (
        <React.Fragment key={index}>
          <Marker position={[day.start.lat, day.start.lng]}>
            <Popup>Start Location: {day.start.name}</Popup>
          </Marker>
          <Marker position={[day.stop.lat, day.stop.lng]}>
            <Popup>Stop Location: {day.stop.name}</Popup>
          </Marker>
          <Polyline positions={polylinePositions[index]} color="blue">
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              Day {day.day}
            </Tooltip>
          </Polyline>
          <Marker position={lineLabels[index]} icon={L.divIcon({ className: 'leaflet-label', html: `<div>Day ${day.day}</div>` })} />
        </React.Fragment>
      ))}
    </MapContainer>
  );
}

MapComponent.propTypes = {
  travelDays: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      start: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      stop: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      description: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MapComponent;
