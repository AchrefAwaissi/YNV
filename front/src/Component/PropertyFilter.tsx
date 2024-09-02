











import React, { ChangeEvent, useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { FilterCriteria, Location } from '../types';

interface Suggestion {
  label: string;
  lat: string;
  lon: string;
}

interface PropertyFilterProps {
  onFilterChange: (criteria: Partial<FilterCriteria>) => void;
  onLocationSelect: (location: Location) => void;
  filterCriteria: FilterCriteria;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onFilterChange, onLocationSelect, filterCriteria }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterChange({ location: value });

    if (value.length > 2) {
      try {
        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/`, {
          params: {
            q: value,
            limit: 5
          }
        });
        const formattedSuggestions = response.data.features.map((item: any) => ({
          label: item.properties.label,
          lat: item.geometry.coordinates[1],
          lon: item.geometry.coordinates[0]
        }));
        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onFilterChange({ location: suggestion.label });
    onLocationSelect({
      location: suggestion.label,
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon)
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handlePriceChange = (value: number, isMin: boolean) => {
    onFilterChange(isMin ? { minPrice: value } : { maxPrice: value });
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[320px]">
      <h2 className="text-xl font-bold mb-6">Filter</h2>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Location</h3>
        <div className="relative">
          <input
            type="text"
            value={filterCriteria.location}
            onChange={handleLocationChange}
            className="w-full p-3 border border-[#EAEAEA] rounded-lg appearance-none bg-white"
            placeholder="Scotland"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <MapPin className="text-black mr-2" size={20} />
            <ChevronDown className="text-black" size={20} />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-[#EAEAEA] rounded-lg mt-1 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Type of Place</h3>
        {/* Add checkboxes for different types of places here */}
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="10000"
          value={filterCriteria.maxPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value), false)}
          className="w-full mb-2"
        />
        <div className="flex justify-between text-sm">
          <span>${filterCriteria.minPrice}</span>
          <span>${filterCriteria.maxPrice}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Size</h3>
        <div className="flex justify-between">
          <input
            type="number"
            value={filterCriteria.minSize}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterChange({ minSize: parseInt(e.target.value) })}
            className="w-[140px] p-3 border border-[#EAEAEA] rounded-lg"
            placeholder="Min"
          />
          <input
            type="number"
            value={filterCriteria.maxSize}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterChange({ maxSize: parseInt(e.target.value) })}
            className="w-[140px] p-3 border border-[#EAEAEA] rounded-lg"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Add more filter options here (Features, Style) */}
    </div>
  );
};

export default PropertyFilter;