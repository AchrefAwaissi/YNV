// types.ts

export interface House {
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
export type TransitLine = {
  id: string;
  name: string;
  type: 'Bus' | 'Tram' | 'Subway';
};

export type EnhancedTransitStop = {
  name: string;
  type: 'Bus' | 'Tram' | 'Subway' | 'Transit';
  lat: number;
  lon: number;
  lines: TransitLine[];
};
export interface TransitRoute {
  name: string;
  description: string;
  color: string;
  type: string;
  departureTime: string;
}

export const getRouteType = (type: number): string => {
  switch (type) {
    case 0: return 'Tram';
    case 1: return 'Subway';
    case 2: return 'Rail';
    case 3: return 'Bus';
    case 4: return 'Ferry';
    case 5: return 'Cable Car';
    case 6: return 'Gondola';
    case 7: return 'Funicular';
    default: return 'Unknown';
  }
};
export interface FilterCriteria {
  location: string;
  minPrice: number;
  maxPrice: number;
  minSize: number;
  maxSize: number;

}
export interface Route {
  id: string;
  name: string;
  type: 'bus' | 'tram' | 'subway';
  duration: number;
  path: google.maps.LatLngLiteral[];
}
export interface Location {
  location: string;
  lat: number;
  lon: number;
}

export type HousingType = 'apartment' | 'house' | 'studio' | 'loft';

export interface POI {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: 'hospital' | 'school' | 'supermarket';
  additionalInfo: string;
}

export interface EnhancedPOI extends POI {
  stars?: number;
  reviewLink?: string;
}

export interface NeighborhoodInfo {
  name: string;
  description: string;
}

export interface EnhancedNeighborhoodInfo extends NeighborhoodInfo {
  stars?: number;
  reviewLink?: string;
  lat: number;  // Ajout de la propriété lat
  lon: number;  // Ajout de la propriété lon
}

export interface Location {
  location: string;
  lat: number;
  lon: number;
}

export interface MapProps {
  houses: House[];
  selectedLocation?: Location;
  onLocationSelect: (location: { lat: number; lon: number }) => void;
  center?: [number, number];
  zoom?: number;
}

export interface PropertyFilterProps {
  onFilterChange: (criteria: Partial<FilterCriteria>) => void;
  onLocationSelect: (location: Location) => void;
  filterCriteria: FilterCriteria;
}

export interface HouseListingsProps {
  houses: House[];
  onHouseSelect?: (house: House) => void;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  profilePicture?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  fullName?: string;
}
export interface HouseListingsProps {
  houses: House[];
  onHouseSelect?: (house: House) => void;
}