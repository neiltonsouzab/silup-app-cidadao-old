import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect } from '@react-navigation/native';
import { PermissionsAndroid, Dimensions } from 'react-native';

interface CoordsData {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface GeolocationData {
  coords: CoordsData | undefined;
}

interface WatchResponse {
  remove(): void;
}

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitudeDelta = 0.15;
const longitudeDelta = latitudeDelta * aspectRatio;

const useGeolocation = (): GeolocationData => {
  const navigation = useNavigation();

  const [coords, setCoords] = useState<CoordsData>();

  useFocusEffect(
    React.useCallback(() => {
      let watchId: number;

      const loadLocation = async (): Promise<void> => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted) {
          watchId = Geolocation.watchPosition(
            (pos) => {
              setCoords({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta,
                longitudeDelta,
              });
            },
            () => {
              setCoords(undefined);
              navigation.goBack();
            },
            {
              enableHighAccuracy: true,
              forceRequestLocation: true,
            },
          );
        } else {
          navigation.goBack();
        }
      };

      loadLocation();

      return () => Geolocation.clearWatch(watchId);
    }, [navigation]),
  );

  return {
    coords,
  };
};

export default useGeolocation;
