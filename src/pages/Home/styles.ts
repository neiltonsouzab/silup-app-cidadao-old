import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Background = styled.ImageBackground`
  flex: 1;
  padding: 0 24px;
`;

export const LogoContainer = styled.View`
  margin-top: 40%;

  align-items: center;
  justify-content: center;
  align-self: center;

  width: 150px;
  height: 140px;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
`;

export const LogoImage = styled.Image``;

export const TitleContainer = styled.View`
  align-items: center;
  margin-top: 60%;
`;

export const WelcomeText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 24px;
  color: #fff;
  text-shadow: 0px 2px 20px #000000;
`;

export const AppName = styled.Text`
  margin-top: 8px;

  font-family: 'RobotoCondensed_700Bold';
  font-size: 24px;
  text-align: center;

  color: #fff;
  text-shadow: 0px 4px 20px #000000;
`;

export const CityName = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: 18px;
  text-align: center;

  color: #fff;

  text-shadow: 0px 4px 20px #000000;
`;

export const Button = styled(RectButton).attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,

  elevation: 24,
})`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 64px;

  margin-top: 30%;

  background: #2e8c24;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  margin-left: 16px;

  font-family: 'Roboto_500Medium';
  font-size: 16px;

  color: #fff;
`;

export const ButtonTexts = styled.View`
  flex-direction: row;

  margin-left: 8px;
`;

export const ButtonPrimaryText = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: 14px;

  color: #fff;
`;

export const ButtonSecondaryText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 14px;

  color: #fff;
`;
