import React, { useState, useEffect } from 'react';
import PropertyFilter from '../Component/PropertyFilter';
import HouseListings from '../Component/HouseListings';
import MapComponent from '../Component/MapComponent';
import { House, FilterCriteria } from '../types';

const HomePage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    location: '',
    minPrice: 0,
    maxPrice: 10000
  });
  const [selectedLocation, setSelectedLocation] = useState<{ location: string; lat: number; lon: number } | undefined>();

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [houses, filterCriteria]);

  const fetchHouses = async () => {
    try {
      const response = await fetch('http://localhost:5000/item');
      const data = await response.json();
      console.log('Fetched houses:', data);
      setHouses(data);
      setFilteredHouses(data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const applyFilters = () => {
    const filtered = houses.filter(house => {
      const locationMatch = 
        (house.city?.toLowerCase().includes(filterCriteria.location.toLowerCase()) ?? false) ||
        (house.address?.toLowerCase().includes(filterCriteria.location.toLowerCase()) ?? false);
      
      const priceMatch = 
        typeof house.price === 'number' &&
        house.price >= filterCriteria.minPrice && 
        house.price <= filterCriteria.maxPrice;
      
      return locationMatch && priceMatch;
    });
    console.log('Filtered houses:', filtered);
    setFilteredHouses(filtered);
  };

  const handleFilterChange = (newCriteria: Partial<FilterCriteria>) => {
    setFilterCriteria(prev => ({ ...prev, ...newCriteria }));
  };

  const handleLocationSelect = (location: string, lat: number, lon: number) => {
    setSelectedLocation({ location, lat, lon });
    setFilterCriteria(prev => ({ ...prev, location }));
  };

  return (
    <div className="flex-1 flex h-screen">
      <div className="w-1/3 p-4 overflow-y-auto">
       <PropertyFilter 
          onFilterChange={handleFilterChange} 
          onLocationSelect={handleLocationSelect}
          filterCriteria={filterCriteria} 
        />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <HouseListings houses={filteredHouses} />
      </div>
      <div className="w-1/3 p-4"> 
        <MapComponent houses={filteredHouses} selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}

export default HomePage;