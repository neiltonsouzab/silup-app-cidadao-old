import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Container, Content, Title } from './styles';

import { useAuth } from '../../hooks/auth';

import InputText from '../../components/InputText';
import Button from '../../components/Button';

const CheckCode: React.FC = () => {
  const { user, checkCode } = useAuth();
  const { whatsapp, cpfCnpj } = user;

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');

  const whatsappMasked = whatsapp.substr(whatsapp.length - 4, whatsapp.length);

  const handleCheckCode = useCallback(() => {
    setLoading(true);

    checkCode({
      code,
      cpfCnpj,
    }).catch((error) => {
      Alert.alert('Atenção', String(error));
    });

    return () => setLoading(false);
  }, [checkCode, code, cpfCnpj]);

  return (
    <Container>
      <Title>
        Informe o código enviado ao seu whatsapp número (**) ****-
        {whatsappMasked}
      </Title>
      <Content>
        <InputText
          placeholder="Código"
          icon="key"
          keyboardType="numeric"
          value={code}
          onChangeText={(text) => setCode(text)}
        />

        <Button label="ENVIAR" onPress={handleCheckCode} loading={loading} />
      </Content>
    </Container>
  );
};

export default CheckCode;
