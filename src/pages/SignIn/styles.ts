import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 32px;

  background: #fff;
`;

export const Header = styled.View`
  align-items: flex-start;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 28px;

  color: #333333;
`;

export const HeaderSubTitle = styled.Text`
  margin-top: 8px;

  font-family: 'Roboto_500Medium';
  font-size: 28px;

  color: #333333;
`;

export const Content = styled.View`
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
