import React, { useState, useCallback } from 'react';
import { StatusBar, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import InputMask from '../../components/InputMask';
import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderTitle,
  HeaderSubTitle,
  Content,
  PrivacyTerm,
  PrivacyTermText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [cpfCnpj, setCpfCnpj] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(() => {
    if (!cpfCnpj) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios (*).');
      return;
    }

    setLoading(true);

    signIn({
      cpfCnpj,
    })
      .then(() => {
        setLoading(false);
        navigation.navigate('CheckCode');
      })
      .catch(() => {
        setLoading(false);
        navigation.navigate('SignUp', { cpfCnpj });
      })
      .finally(() => setLoading(false));
  }, [signIn, cpfCnpj, navigation]);

  const handelOpenTermPrivacy = useCallback(() => {
    Linking.openURL('https://emdur.silup.com.br/termoprivacidade');
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#2E8C24" />
      <Header>
        <HeaderTitle>Certo!</HeaderTitle>
        <HeaderSubTitle>Vamos começar?</HeaderSubTitle>
      </Header>

      <Content>
        <InputMask
          icon="id-card"
          type="cpf"
          placeholder="Informe seu CPF *"
          value={cpfCnpj}
          onChangeText={(value) => setCpfCnpj(value)}
        />

        <Button
          label="PRÓXIMO PASSO"
          loading={loading}
          onPress={handleSignIn}
        />

        <PrivacyTerm onPress={handelOpenTermPrivacy}>
          <PrivacyTermText>Termo de Privacidade</PrivacyTermText>
        </PrivacyTerm>
      </Content>
    </Container>
  );
};

export default SignIn;
