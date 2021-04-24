import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  ImageSourcePropType,
  ToastAndroid,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { parse, format } from 'date-fns';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import ButtonFloat from '../../../components/ButtonFloat';
import Loading from '../../../components/Loading';

import lampBrokenUnselected from '../../../assets/lamp-broken-unselected.png';
import lampErrorUnselected from '../../../assets/lamp-error-unselected.png';
import lampMoorningUnselected from '../../../assets/lamp-moorning-unselected.png';
import lampNewUnselected from '../../../assets/lamp-new-unselected.png';
import lampNightUnselected from '../../../assets/lamp-night-unselected.png';
import lampOscillationUnselected from '../../../assets/lamp-oscillation-unselected.png';
import lampOthersUnselected from '../../../assets/lamp-others-unselected.png';
import lampUnspecifiedUnselected from '../../../assets/lamp-unspecified-unselected.png';

import {
  Container,
  Header,
  HeaderTitle,
  HeaderSubTitle,
  ProblemList,
  ProblemItem,
  ProblemNumber,
  ProblemItemTypeImage,
  ProblemItemTypeName,
  ProblemItemStatus,
  ProblemItemAddress,
  ProblemItemDate,
  Indicator,
} from './styles';

interface ProblemResponse {
  status: boolean;
  mensagem: string;
  data: {
    id: number;
    endereco: string;
    nometipoocorrencia: string;
    nomesituacaoocorrencia: string;
    created_at: string;
  }[];
}

export interface Problem {
  id: number;
  address: string;
  type: string;
  status: string;
  icon: ImageSourcePropType;
  date: string;
}

interface IconProps {
  [key: string]: ImageSourcePropType;
}

const icons: IconProps = {
  Implantação: lampNewUnselected,
  'Lâmpada acesa durante o dia': lampMoorningUnselected,
  'Lâmpada apagada': lampNightUnselected,
  'Lâmpada Oscilando': lampOscillationUnselected,
  'Medições com erro': lampErrorUnselected,
  'Problema não especificado': lampUnspecifiedUnselected,
  Vandalismo: lampBrokenUnselected,
  Outros: lampOthersUnselected,
};

const List: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [problems, setProblems] = useState<Problem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadProblems = async (): Promise<void> => {
        try {
          const { data: problemResponse } = await api.get<ProblemResponse>(
            '/cidadao/consulta_notificacao_cidadao',
          );

          const problemsResponseData = problemResponse.data;
          const problemList = problemsResponseData.map(
            (item): Problem => {
              return {
                id: item.id,
                address: item.endereco,
                type: item.nometipoocorrencia,
                status: item.nomesituacaoocorrencia,
                icon: icons[item.nometipoocorrencia] || lampOthersUnselected,
                date: format(
                  parse(item.created_at, 'dd-MM-yyyy HH:mm:ss', new Date()),
                  'dd/MM/yyyy HH:mm',
                ),
              };
            },
          );

          setProblems(problemList);
        } catch (error) {
          ToastAndroid.showWithGravity(
            'Não foi possível carregar seus problemas cadastrados.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      };

      loadProblems();
    }, []),
  );

  const handleNavigateToNotificationNew = useCallback(() => {
    navigation.navigate('NotificationCreateSelectLocation');
  }, [navigation]);

  if (!problems) {
    return <Loading message="Carregando os problemas cadastrados..." />;
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#2e8c24" />

      <Header>
        <HeaderTitle>Olá {user.name}</HeaderTitle>
        <HeaderSubTitle>
          {problems.length > 0
            ? 'Esses são os problemas que você nos informou.'
            : 'Parece que você ainda não informou nenhum problema. Que tal começar agora?'}
        </HeaderSubTitle>
      </Header>
      <ProblemList
        data={problems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: problem }) => (
          <ProblemItem>
            <ProblemNumber>000{problem.id}</ProblemNumber>
            <ProblemItemTypeImage source={problem.icon} />
            <ProblemItemTypeName>{problem.type}</ProblemItemTypeName>
            <ProblemItemStatus resolved={problem.status === 'resolvido'}>
              {problem.status}
            </ProblemItemStatus>
            <ProblemItemAddress>{problem.address}</ProblemItemAddress>
            <ProblemItemDate>{problem.date}</ProblemItemDate>
            <Indicator />
          </ProblemItem>
        )}
      />
      <ButtonFloat icon="plus" onPress={handleNavigateToNotificationNew} />
    </Container>
  );
};

export default List;
