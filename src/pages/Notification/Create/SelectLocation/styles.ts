import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  position: relative;
`;

export const EditAddressButton = styled(RectButton)`
  position: absolute;
  padding: 16px;

  top: 24px;
  left: 24px;
  right: 24px;

  background: #2e8c24;
  border-radius: 20px;
`;

export const EditAddressButtonText = styled.Text`
  text-align: center;

  font-family: 'Roboto_700Bold';
  font-size: 14px;
  color: #fff;
`;

export const InputSearchContainer = styled.View`
  position: absolute;

  bottom: 24px;
  left: 24px;
  right: 24px;

  flex-direction: row;
  align-items: center;
  height: 60px;

  background: #fff;
  border-radius: 20px;
  border-top-width: 1px;
  border-top-color: #d3c3c3;
  border-left-width: 1px;
  border-left-color: #d3c3c3;
  border-bottom-width: 1px;
  border-bottom-color: #d3c3c3;
`;

export const InputSearch = styled.View`
  justify-content: center;
  flex: 1;
  height: 100%;
  padding: 0 24px;
`;

export const InputSearchValue = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: 14px;
  color: #333;
`;

export const InputSearchButton = styled(RectButton)`
  width: 100px;
  height: 100%;

  background: #2e8c24;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
`;

export const InputSearchButtonText = styled.Text`
  font-family: 'Roboto_700Bold';
  font-size: 12px;
  text-align: center;
  color: #fff;
`;
