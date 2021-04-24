import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import googleGeocode from '../../../../services/google-geocode';

import InputText from '../../../../components/InputText';

import {
  Container,
  Header,
  AddressesList,
  AddressItem,
  AddressValue,
} from './styles';

const SearchLocation: React.FC = () => {
  const navigation = useNavigation();

  const [foundAddress, setFounAddress] = useState<string[]>([]);
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    googleGeocode.searchAddress(searchAddress).then((addresses) => {
      setFounAddress(addresses);
    });
  }, [searchAddress]);

  const handleAddressSelected = useCallback(
    async (selectedAddress: string) => {
      const coords = await googleGeocode.getCoordsByAddress(selectedAddress);

      navigation.navigate('NotificationCreateSelectLocation', {
        address: selectedAddress,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <InputText
          placeholder="Pesquise a localização"
          icon="map-marker-alt"
          value={searchAddress}
          onChangeText={(text) => setSearchAddress(text)}
        />
      </Header>

      <AddressesList
        data={foundAddress}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <AddressItem
            isFirst={index === 0}
            onPress={() => handleAddressSelected(item)}
          >
            <AddressValue isFirst={index === 0}>{item}</AddressValue>
          </AddressItem>
        )}
      />
    </Container>
  );
};

export default SearchLocation;
