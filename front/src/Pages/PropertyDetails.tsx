import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Calendar, MapPin, Maximize2, BedDouble, Square } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import 'leaflet/dist/leaflet.css';

interface House {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  title: string;
  address: string;
  city: string;
  typeOfHousing: string;
  rooms: number;
  bedrooms: number;
  area: number;
  latitude?: number;
  longitude?: number;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const PropertyDetails: React.FC = () => {
  const [property, setProperty] = useState<House | null>(null);
  const { id } = useParams<{ id: string }>();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAh0yrnHc34HwncDoKBMYutdQCSueTc9FA" // Replace with your actual API key
  });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/item/${id}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const center = property.latitude && property.longitude
    ? { lat: property.latitude, lng: property.longitude }
    : { lat: 48.8566, lng: 2.3522 }; // Paris coordinates as default

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
      {/* ... (rest of the component remains the same) ... */}

      {/* Google Maps */}
      <div className="h-64 sm:h-96 relative">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {property.latitude && property.longitude && (
              <Marker
                position={{ lat: property.latitude, lng: property.longitude }}
                title={property.address}
              />
            )}
          </GoogleMap>
        ) : <div>Loading map...</div>}
      </div>

      {/* ... (rest of the component remains the same) ... */}
    </div>
  );
};

export default PropertyDetails;