import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodingService {
  async getCoordinates(
    address: string,
    city: string,
    country: string,
  ): Promise<{ lat: number; lng: number } | null> {
    try {
      const fullAddress = `${address}, ${city}, ${country}`;
      const encodedAddress = encodeURIComponent(fullAddress);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`,
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      }
    } catch (error) {
      console.error('Error getting coordinates:', error);
    }
    return null;
  }
}
