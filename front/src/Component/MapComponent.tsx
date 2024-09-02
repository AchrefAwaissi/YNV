


     import React, { useState, useEffect, useMemo } from 'react';
     import { GoogleMap, useJsApiLoader, Marker, Circle, InfoWindow } from '@react-google-maps/api';
     import axios from 'axios';
     import { X, School } from 'lucide-react';
     import { House, MapProps, Location, POI } from '../types';
     
     const MapComponent: React.FC<MapProps> = ({ 
       houses, 
       selectedLocation,
       onLocationSelect,
       center = [44.8378, -0.5792], 
       zoom = 13 
     }) => {
       const { isLoaded } = useJsApiLoader({
         id: 'google-map-script',
         googleMapsApiKey:"AIzaSyAh0yrnHc34HwncDoKBMYutdQCSueTc9FA" 
       });
     
       const [map, setMap] = useState<google.maps.Map | null>(null);
       const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: center[0], lng: center[1] });
       const [mapZoom, setMapZoom] = useState(zoom);
       const [pois, setPois] = useState<POI[]>([]);
       const [showSchools, setShowSchools] = useState(false);
       const [searchRadius, setSearchRadius] = useState(2000);
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);
       const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
       const [showFilters, setShowFilters] = useState(false);
       const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);
     
       const fetchPOIs = async (lat: number, lon: number) => {
         setLoading(true);
         setError(null);
         try {
           const query = `
             [out:json];
             (
               node["amenity"="school"](around:${searchRadius},${lat},${lon});
               way["amenity"="school"](around:${searchRadius},${lat},${lon});
               relation["amenity"="school"](around:${searchRadius},${lat},${lon});
             );
             out center;
           `;
           const response = await axios.get('https://overpass-api.de/api/interpreter', { params: { data: query } });
           const newPois: POI[] = response.data.elements.map((el: any) => {
             let lat = el.lat;
             let lon = el.lon;
     
             if (el.type === 'way' || el.type === 'relation') {
               lat = el.center.lat;
               lon = el.center.lon;
             }
     
             return {
               id: el.id.toString(),
               name: el.tags.name || 'School',
               lat,
               lon,
               type: 'school',
               additionalInfo: el.tags['school:type'] || 'School'
             };
           });
           setPois(newPois);
         } catch (err) {
           setError('Failed to fetch POIs. Please try again.');
           console.error('Error fetching POIs:', err);
         } finally {
           setLoading(false);
         }
       };
     
       const handleHouseClick = (house: House) => {
        setSelectedHouse(house);
        setShowFilters(true);
        if (house.latitude && house.longitude) {
          onLocationSelect({
            location: house.address || 'Selected Location', // Utilisez l'adresse de la maison ou une valeur par défaut
            lat: house.latitude,
            lon: house.longitude
          });
        }
      };
     
       useEffect(() => {
         if (selectedHouse && selectedHouse.latitude && selectedHouse.longitude) {
           fetchPOIs(selectedHouse.latitude, selectedHouse.longitude);
         }
       }, [selectedHouse, searchRadius]);
     
       const filteredPois = useMemo(() => {
         return showSchools ? pois : [];
       }, [pois, showSchools]);
     
       const poiCount = useMemo(() => pois.length, [pois]);
     
       return  isLoaded ? (
        <div className="relative">
          <GoogleMap
            mapContainerStyle={{ height: '70vh', width: '100%' }}
            center={mapCenter}
            zoom={mapZoom}
            onLoad={setMap}
            onUnmount={() => setMap(null)}
          >
             {houses.map((house) => (
               <Marker
                 key={house._id}
                 position={{ lat: house.latitude || 0, lng: house.longitude || 0 }}
                 onClick={() => handleHouseClick(house)}
               >
                 {activeInfoWindow === house._id && (
                   <InfoWindow onCloseClick={() => setActiveInfoWindow(null)}>
                     <div>
                       <h3>{house.title}</h3>
                       <p>{house.price} €</p>
                     </div>
                   </InfoWindow>
                 )}
               </Marker>
             ))}
             {selectedHouse && selectedHouse.latitude && selectedHouse.longitude && (
               <Circle
                 center={{ lat: selectedHouse.latitude, lng: selectedHouse.longitude }}
                 radius={searchRadius}
                 options={{
                   fillColor: 'blue',
                   fillOpacity: 0.1,
                   strokeColor: 'blue',
                   strokeOpacity: 1,
                   strokeWeight: 1,
                 }}
               />
             )}
             {filteredPois.map((poi) => (
               <Marker
                 key={poi.id}
                 position={{ lat: poi.lat, lng: poi.lon }}
                 icon={{
                   url: `https://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
                   scaledSize: new window.google.maps.Size(30, 30)
                 }}
                 onClick={() => setActiveInfoWindow(poi.id)}
               >
                 {activeInfoWindow === poi.id && (
                   <InfoWindow onCloseClick={() => setActiveInfoWindow(null)}>
                     <div>
                       <h3>{poi.name}</h3>
                       <p>Type: School</p>
                       {poi.additionalInfo && <p>Info: {poi.additionalInfo}</p>}
                     </div>
                   </InfoWindow>
                 )}
               </Marker>
             ))}
           </GoogleMap>
     
           <div className="absolute top-2 right-2 bg-white p-4 rounded shadow-md z-[1000]">
             <div className="flex justify-between items-center mb-2">
               <h3 className="font-bold">Filters</h3>
               <button onClick={() => setShowFilters(!showFilters)} className="text-gray-500 hover:text-gray-700">
                 {showFilters ? <X size={20} /> : 'Show Filters'}
               </button>
             </div>
             {showFilters && selectedHouse && (
               <>
                 <p className="mb-2">Selected: {selectedHouse.title}</p>
                 <select 
                   value={searchRadius} 
                   onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                   className="mb-2 w-full p-2 border rounded"
                 >
                   <option value={1000}>1 km</option>
                   <option value={2000}>2 km</option>
                   <option value={3000}>3 km</option>
                   <option value={4000}>4 km</option>
                   <option value={5000}>5 km</option>
                 </select>
                 <div className="space-y-2">
                   <label className="flex items-center">
                     <input 
                       type="checkbox" 
                       checked={showSchools} 
                       onChange={() => setShowSchools(!showSchools)}
                       className="mr-2 h-4 w-4"
                     />
                     <span>Schools ({poiCount})</span>
                   </label>
                 </div>
               </>
             )}
             {loading && <p className="mt-2">Loading...</p>}
             {error && <p className="mt-2 text-red-500">{error}</p>}
           </div>
         </div>
       ) : <></>;
     };
     
     export default MapComponent;