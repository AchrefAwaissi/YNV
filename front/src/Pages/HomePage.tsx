import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropertyFilter from '../Component/PropertyFilter';
import HouseListings from '../Component/HouseListings';
import MapComponent from '../Component/MapComponent';
import { House, FilterCriteria, Location } from '../types';

const HomePage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    location: '',
    minPrice: 0,
    maxPrice: 10000,
    minSize: 0,
    maxSize: Infinity
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHouses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/item');
      setHouses(response.data);
      setFilteredHouses(response.data);
    } catch (error) {
      setError('Error fetching houses. Please try again later.');
      console.error('Error fetching houses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  const applyFilters = useCallback(() => {
    const filtered = houses.filter(house => {
      const locationMatch =
        !filterCriteria.location ||
        house.city?.toLowerCase().includes(filterCriteria.location.toLowerCase()) ||
        house.address?.toLowerCase().includes(filterCriteria.location.toLowerCase());

      const priceMatch =
        house.price >= filterCriteria.minPrice &&
        house.price <= filterCriteria.maxPrice;

      return locationMatch && priceMatch;
    });
    setFilteredHouses(filtered);
  }, [houses, filterCriteria]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newCriteria: Partial<FilterCriteria>) => {
    setFilterCriteria(prev => ({ ...prev, ...newCriteria }));
  };

  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
    setFilterCriteria(prev => ({ ...prev, location: location.location }));
  }, []);

  const handleMapLocationSelect = useCallback(({ lat, lon }: { lat: number; lon: number }) => {
    setSelectedLocation(prev => prev ? { ...prev, lat, lon } : { location: '', lat, lon });
  }, []);

  const handleHouseSelect = useCallback((house: House) => {
    if (house.latitude && house.longitude) {
      setSelectedLocation({
        location: house.address || '',
        lat: house.latitude,
        lon: house.longitude
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Property Search</h1>
      </header>

      <main className="flex-grow flex overflow-hidden">
        <div className="w-1/4 p-4 overflow-y-auto border-r">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <PropertyFilter
              onFilterChange={handleFilterChange}
              onLocationSelect={handleLocationSelect}
              filterCriteria={filterCriteria}
            />
          </div>
        </div>

        <div className="w-3/4 flex overflow-hidden">
          <div className="w-1/2 p-4 overflow-y-auto border-r">
            {loading && <p>Loading houses...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <HouseListings
                houses={filteredHouses}
                onHouseSelect={handleHouseSelect}
              />
            )}
          </div>
          <div className="w-1/2 p-4">
            <MapComponent
              houses={filteredHouses}
              selectedLocation={selectedLocation}
              onLocationSelect={handleMapLocationSelect}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;