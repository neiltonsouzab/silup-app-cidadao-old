import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import backgroundImage from '../../assets/background-image.jpg';
import logo from '../../assets/agency-logo.png';

import {
  Container,
  Background,
  LogoContainer,
  LogoImage,
  AppName,
  CityName,
  Button,
  ButtonTexts,
  ButtonPrimaryText,
  ButtonSecondaryText,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const navigateToSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <Container>
      <Background
        source={backgroundImage}
        imageStyle={{
          backgroundColor: '#000',
          opacity: 0.8,
        }}
      >
        <LogoContainer>
          <LogoImage source={logo} />
        </LogoContainer>

        <AppName>PORTO VELHO</AppName>
        <CityName>ILUMINADA</CityName>

        <Button onPress={navigateToSignIn}>
          <FontAwesome name="exclamation-circle" size={24} color="#FFF" />

          <ButtonTexts>
            <ButtonPrimaryText>Viu algo de errado?</ButtonPrimaryText>
            <ButtonSecondaryText> Nos informe agora!</ButtonSecondaryText>
          </ButtonTexts>
        </Button>
      </Background>
    </Container>
  );
};

export default Home;
