import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Maximize2, BedDouble, Square } from 'lucide-react';

interface House {
  _id: string; // Ajout de l'ID pour la navigation
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
}

const HouseListings: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:5000/item');
        const data = await response.json();
        setHouses(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching house data:', error);
      }
    };
    fetchHouses();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  const HouseCard: React.FC<House> = ({
    _id,
    image,
    price,
    address,
    city,
    typeOfHousing,
    title,
    rooms,
    bedrooms,
    area
  }) => (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md w-full mb-4 cursor-pointer" 
      onClick={() => handleCardClick(_id)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-2/5 lg:w-1/2 h-64 md:h-auto">
          <img
            src={image ? `http://localhost:5000/uploads/${image}` : "/api/placeholder/400/300"}
            alt={`${address}, ${city}`}
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-2 right-2 bg-white rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation(); // Empêche le clic sur la carte
              // Ajoutez ici la logique pour gérer le clic sur le cœur
            }}
          >
            <Heart className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="p-4 md:w-3/5 lg:w-1/2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-semibold">{typeOfHousing || 'maison'}</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{price.toLocaleString()} €</span>
          </div>
          <h2 className="text-lg font-semibold mb-2 truncate">{title}</h2>
          <p className="text-gray-600 text-sm mb-4 truncate">{address}, {city}</p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Maximize2 className="h-5 w-5 mr-1 text-gray-500" />
              <span className="text-sm">{area}</span>
            </div>
            <div className="flex items-center">
              <BedDouble className="h-5 w-5 mr-1 text-gray-500" />
              <span className="text-sm">{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-5 w-5 mr-1 text-gray-500" />
              <span className="text-sm">{rooms}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{houses.length} Résultats à {houses[0]?.city || 'ville'}</h1>
      <div className="space-y-4">
        {houses.map((house) => (
          <HouseCard key={house._id} {...house} />
        ))}
      </div>
    </div>
  );
};

export default HouseListings;