import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { House } from '../types';

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface MapComponentProps {
  houses: House[];
  selectedLocation?: { location: string; lat: number; lon: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ houses, selectedLocation }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAh0yrnHc34HwncDoKBMYutdQCSueTc9FA" // Replace with your actual API key
  });

  const center = selectedLocation
    ? { lat: selectedLocation.lat, lng: selectedLocation.lon }
    : houses.length > 0 && houses[0].latitude && houses[0].longitude
    ? { lat: houses[0].latitude, lng: houses[0].longitude }
    : { lat: 48.8566, lng: 2.3522 }; // Paris coordinates as default

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      {houses.map((house) => {
        if (house.latitude && house.longitude) {
          return (
            <Marker
              key={house._id}
              position={{ lat: house.latitude, lng: house.longitude }}
              title={house.title}
            />
          );
        }
        return null;
      })}
      {selectedLocation && (
        <Marker
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lon }}
          title="Selected Location"
        />
      )}
    </GoogleMap>
  ) : <></>
};

export default MapComponent;