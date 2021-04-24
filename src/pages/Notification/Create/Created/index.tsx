import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import {
  Container,
  Header,
  SuccessIcon,
  SuccessMessage,
  SuccessInfo,
  BackButton,
  BackButtonText,
} from './styles';

const Created: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToNotificationList = useCallback(() => {
    navigation.navigate('NotificationList');
  }, [navigation]);

  return (
    <Container>
      <Header />
      <SuccessIcon>
        <FontAwesome5 name="check" size={40} color="#2e8c24" />
      </SuccessIcon>
      <SuccessMessage>Problema informado com sucesso!</SuccessMessage>
      <SuccessInfo>
        Fique de olho nos status do problema. Em breve iremos atendê-lo
      </SuccessInfo>

      <BackButton onPress={handleNavigateToNotificationList}>
        <BackButtonText>Voltar</BackButtonText>
      </BackButton>
    </Container>
  );
};

export default Created;
