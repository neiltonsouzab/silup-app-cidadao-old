import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <View />

      <Title>{title}</Title>

      <BorderlessButton onPress={handleGoBack}>
        <FontAwesome5 name="arrow-left" size={20} color="#FFF" />
      </BorderlessButton>
    </Container>
  );
};

export default Header;
