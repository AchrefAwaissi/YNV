export interface House {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  title: string;
  address: string; // Assurez-vous que cette propriété est présente
  city: string;
  typeOfHousing: string;
  rooms: number;
  bedrooms: number;
  area: number;
  latitude?: number;
  longitude?: number;
}

export interface Location {
  location: string;
  lat: number;
  lon: number;
}

export interface FilterCriteria {
  location: string;
  minPrice: number;
  maxPrice: number;
}

export interface POI {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: string;
  additionalInfo?: string;
}

export interface MapProps {
  houses: House[];
  selectedLocation?: Location;
  onLocationSelect: (location: Location) => void;
  center?: [number, number];
  zoom?: number;
}