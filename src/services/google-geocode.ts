import api from './api';

interface AddressComponent {
  long_name: string;
  short_name: string;
  type: string[];
}

interface Address {
  results: [
    {
      address_components: AddressComponent[];
      formatted_address: string;
    },
  ];
}

interface Coords {
  latitude: number;
  longitude: number;
}

interface SearchAddressReponse {
  predictions: Array<{
    description: string;
  }>;
}

interface GetCoordsByAddressResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}

export interface AddressResponse {
  number: string;
  route: string;
  district: string;
  city: string;
  state: string;
  full_address: string;
}

export default {
  async getAddressByCoords(
    latitude: number,
    longitude: number,
  ): Promise<AddressResponse> {
    try {
      const { data } = await api.get<Address>(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${latitude},${longitude}`,
            result_type: 'street_address',
            key: 'AIzaSyBSOFItR7-aCYhFSPQ5rcl8gfWRGcbN5io',
            language: 'pt',
          },
        },
      );

      const number = data.results[0].address_components[0].short_name;
      const route = data.results[0].address_components[1].long_name;
      const district = data.results[0].address_components[2].short_name;
      const city = data.results[0].address_components[3].short_name;
      const state = data.results[0].address_components[4].short_name;
      const full_address = data.results[0].formatted_address;

      return {
        number,
        route,
        district,
        city,
        state,
        full_address,
      };
    } catch {
      throw new Error('Erro ao buscar seu endereço.');
    }
  },

  async getCoordsByAddress(address: string): Promise<Coords> {
    const response = await api.get<GetCoordsByAddressResponse>(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key: 'AIzaSyBSOFItR7-aCYhFSPQ5rcl8gfWRGcbN5io',
          language: 'pt',
        },
      },
    );

    const { results } = response.data;
    const { lat, lng } = results[0].geometry.location;

    return {
      latitude: lat,
      longitude: lng,
    };
  },

  async searchAddress(filter: string): Promise<string[]> {
    const response = await api.get<SearchAddressReponse>(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          key: 'AIzaSyBSOFItR7-aCYhFSPQ5rcl8gfWRGcbN5io',
          input: filter,
          language: 'pt',
        },
      },
    );

    const { predictions } = response.data;

    return predictions.map((prediction) => prediction.description);
  },
};
