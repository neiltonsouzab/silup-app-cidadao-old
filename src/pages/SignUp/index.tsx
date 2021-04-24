import React, { useState, useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import InputText from '../../components/InputText';
import InputMask from '../../components/InputMask';
import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderMessage,
  HeaderTitle,
  PrivacyTerm,
  PrivacyTermText,
} from './styles';

interface RouteParams {
  cpfCnpj: string;
}

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const cpfCnpjInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const whatsappInputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState(routeParams.cpfCnpj);
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = useCallback(() => {
    if (!name || !cpfCnpj || !email || !whatsapp) {
      Alert.alert('Atenção', 'Informe todos os campos.');
      setLoading(false);
      return;
    }

    setLoading(true);

    signUp({
      cpfCnpj,
      name,
      whatsapp,
      email,
    })
      .then(() => {
        navigation.navigate('CheckCode');
      })
      .catch((error) => {
        Alert.alert('Atenção', error);
      });
  }, [name, cpfCnpj, email, whatsapp, signUp, navigation]);

  const handelOpenTermPrivacy = useCallback(() => {
    Linking.openURL('https://emdur.silup.com.br/termoprivacidade');
  }, []);

  return (
    <KeyboardAvoidingView
      enabled
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <ScrollView>
        <Container>
          <Header>
            <HeaderMessage>
              Ops.. parece que você ainda não possui cadastro.
            </HeaderMessage>

            <HeaderTitle>Faça seu cadastro</HeaderTitle>
          </Header>

          <InputText
            placeholder="NOME"
            icon="user-alt"
            autoCapitalize="characters"
            returnKeyType="next"
            value={name}
            onSubmitEditing={() => emailInputRef.current?.focus()}
            onChangeText={(text) => setName(text)}
          />

          <InputMask
            editable={false}
            type="cpf"
            placeholder="CPF"
            icon="id-card"
            returnKeyType="next"
            value={cpfCnpj}
            ref={cpfCnpjInputRef}
            onSubmitEditing={() => emailInputRef.current?.focus()}
            onChangeText={(text) => setCpfCnpj(text)}
          />

          <InputText
            placeholder="E-MAIL"
            icon="at"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            ref={emailInputRef}
            onSubmitEditing={() => whatsappInputRef.current?.focus()}
            onChangeText={(text) => setEmail(text)}
          />

          <InputMask
            type="cel-phone"
            placeholder="WHATSAPP"
            icon="whatsapp"
            returnKeyType="send"
            value={whatsapp}
            ref={whatsappInputRef}
            onSubmitEditing={handleSubmit}
            onChangeText={(text) => setWhatsapp(text)}
          />
          <Button label="SALVAR" onPress={handleSubmit} loading={loading} />

          <PrivacyTerm onPress={handelOpenTermPrivacy}>
            <PrivacyTermText>Termo de Privacidade</PrivacyTermText>
          </PrivacyTerm>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
