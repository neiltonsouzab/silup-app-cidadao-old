import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { ProblemType } from './index';

export const Container = styled.View`
  flex: 1;
  background: #fff;

  padding: 0 32px;
`;

export const Header = styled.View`
  margin-top: 32px;
`;

export const ProblemTypeTitle = styled.Text`
  margin-top: 24px;

  font-family: 'Roboto_400Regular';
  font-size: 16px;

  color: #c4c4c4;
`;

export const ProblemTypeList = styled(
  FlatList as new () => FlatList<ProblemType>,
)`
  margin-top: 16px;
`;

export const ProblemTypeItem = styled.TouchableOpacity`
  align-items: center;
  margin-right: 8px;
`;

export const ProblemTypeIcon = styled.Image``;

export const ProblemTypeName = styled.Text`
  max-width: 70px;
  margin-top: 4px;

  font-family: 'Roboto_400Regular';
  font-size: 10px;
  text-align: center;

  color: #333333;
`;

export const CurrentLocationContainer = styled.View`
  align-items: center;
  margin-top: 24px;
`;

export const CurrentLocationHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CurrentLocationTitle = styled.Text`
  margin-left: 8px;

  font-family: 'Roboto_400Regular';
  font-size: 16px;

  color: #c4c4c4;
`;

export const CurrentLocationAddress = styled.Text`
  margin-top: 8px;

  font-family: 'Roboto_500Medium';
  font-size: 14px;
  color: #333333;

  text-align: center;
`;
