import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Dimensions, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE, MapEvent } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';

import useGeolocation from '../../../../hooks/geolocation';
import googleGeocode from '../../../../services/google-geocode';

import Loading from '../../../../components/Loading';

import {
  Container,
  EditAddressButton,
  EditAddressButtonText,
  InputSearchContainer,
  InputSearch,
  InputSearchValue,
  InputSearchButton,
  InputSearchButtonText,
} from './styles';

interface RouteParams {
  address: string;
  latitude: number;
  longitude: number;
}

const SelectLocation: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;

  const { coords } = useGeolocation();
  const mapRef = useRef<MapView>(null);

  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (params) {
      setLatitude(params.latitude);
      setLongitude(params.longitude);
      setAddress(params.address);

      mapRef.current?.animateToRegion({
        latitude: params.latitude,
        longitude: params.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    } else if (coords) {
      googleGeocode
        .getAddressByCoords(coords.latitude, coords.longitude)
        .then((response) => {
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
          setAddress(response.full_address);

          mapRef.current?.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          });
        });
    }
  }, [coords, params]);

  const handleSelectLocation = useCallback(async (event: MapEvent) => {
    const { coordinate } = event.nativeEvent;

    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);

    const googleAddress = await googleGeocode.getAddressByCoords(
      coordinate.latitude,
      coordinate.longitude,
    );

    setAddress(googleAddress.full_address);
  }, []);

  const handleNavigateToSearchLocation = useCallback(() => {
    navigation.navigate('NotificationCreateSearchLocation');
  }, [navigation]);

  const hanadleNavigateToSelectTypeAndImage = useCallback(() => {
    navigation.navigate('NotificationCreateSelectTypeAndImage', {
      address,
      latitude,
      longitude,
    });
  }, [navigation, address, latitude, longitude]);

  if (!latitude || !longitude || !address) {
    return <Loading message="Carregando..." />;
  }

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        <Marker
          onDragEnd={handleSelectLocation}
          draggable
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>

      <EditAddressButton onPress={handleNavigateToSearchLocation}>
        <EditAddressButtonText>ALTERAR ENDEREÇO</EditAddressButtonText>
      </EditAddressButton>

      <InputSearchContainer>
        <InputSearch>
          <InputSearchValue numberOfLines={2}>{address}</InputSearchValue>
        </InputSearch>
        <InputSearchButton onPress={hanadleNavigateToSelectTypeAndImage}>
          <InputSearchButtonText>CONFIRMAR ENDEREÇO</InputSearchButtonText>
        </InputSearchButton>
      </InputSearchContainer>
    </Container>
  );
};

export default SelectLocation;
