import React from 'react';

interface CityInfoProps {
  name: string;
  costPerSquareMeter: number;
  population: number;
  area: number;
  monumentImage: string;
}

const CityInfoCard: React.FC<CityInfoProps> = ({ name, costPerSquareMeter, population, area, monumentImage }) => {


  return (
    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md z-[1000] max-w-xs">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <p className="text-sm mb-1">Coût/m² : {costPerSquareMeter} €</p>
      <p className="text-sm mb-1">Population : {population.toLocaleString()}</p>
      <p className="text-sm mb-2">Surface : {area} km²</p>
      
      <p className="text-xs text-gray-500 mb-2 break-all">Image URL: {monumentImage}</p>
      
      <div className="relative w-full h-32">
        {monumentImage ? (
          <img
            src={monumentImage}
            alt={`Monument de ${name}`}
            className="w-full h-full object-cover rounded"
            onError={(e) => {
              console.error("Erreur de chargement de l'image:", e);
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
            <p className="text-gray-500">Aucune image disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityInfoCard;