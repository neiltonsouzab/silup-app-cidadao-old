import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 32px;

  background: #fff;
`;

export const Header = styled.View`
  align-items: center;

  margin-top: 100px;
  margin-bottom: 24px;
`;

export const HeaderMessage = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: 16px;

  text-align: center;

  color: #e94560;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 28px;

  color: #333333;

  margin-top: 32px;
`;

export const PrivacyTerm = styled.TouchableOpacity`
  margin-top: 16px;

  width: 100%;
`;

export const PrivacyTermText = styled.Text`
  text-align: center;

  font-family: 'Roboto_500Medium';
  font-size: 14px;
  color: #2e8c24;
`;
