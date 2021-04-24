import React, { useCallback, useState } from 'react';
import {
  ImageSourcePropType,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  Alert,
  Text,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import api from '../../../../services/api';
import firebaseStorage from '../../../../services/firebase-storage';
import googleGeocode, {
  AddressResponse,
} from '../../../../services/google-geocode';
import { useAuth } from '../../../../hooks/auth';

import InputImage from '../../../../components/InputImage';
import InputText from '../../../../components/InputText';
import Button from '../../../../components/Button';
import Loading from '../../../../components/Loading';

import lampBrokenSelected from '../../../../assets/lamp-broken-selected.png';
import lampBrokenUnselected from '../../../../assets/lamp-broken-unselected.png';

import lampErrorSelected from '../../../../assets/lamp-error-selected.png';
import lampErrorUnselected from '../../../../assets/lamp-error-unselected.png';

import lampMoorningSelected from '../../../../assets/lamp-moorning-selected.png';
import lampMoorningUnselected from '../../../../assets/lamp-moorning-unselected.png';

import lampNewSelected from '../../../../assets/lamp-new-selected.png';
import lampNewUnselected from '../../../../assets/lamp-new-unselected.png';

import lampNightSelected from '../../../../assets/lamp-night-selected.png';
import lampNightUnselected from '../../../../assets/lamp-night-unselected.png';

import lampOscillationSelected from '../../../../assets/lamp-oscillation-selected.png';
import lampOscillationUnselected from '../../../../assets/lamp-oscillation-unselected.png';

import lampOthersSelected from '../../../../assets/lamp-others-selected.png';
import lampOthersUnselected from '../../../../assets/lamp-others-unselected.png';

import lampUnspecifiedSelected from '../../../../assets/lamp-unspecified-selected.png';
import lampUnspecifiedUnselected from '../../../../assets/lamp-unspecified-unselected.png';

import {
  Container,
  Header,
  CurrentLocationContainer,
  CurrentLocationHeader,
  CurrentLocationTitle,
  CurrentLocationAddress,
  ProblemTypeTitle,
  ProblemTypeList,
  ProblemTypeItem,
  ProblemTypeIcon,
  ProblemTypeName,
} from './styles';

interface ProblemTypeResponse {
  status: boolean;
  mensagem: string;
  data: {
    id: number;
    nometipoocorrencia: string;
  }[];
}

interface IconProps {
  [key: string]: {
    selected: ImageSourcePropType;
    unselected: ImageSourcePropType;
  };
}

export interface ProblemType {
  id: number;
  name: string;
  icon: {
    selected: ImageSourcePropType;
    unselected: ImageSourcePropType;
  };
}

const icons: IconProps = {
  Implantação: {
    selected: lampNewSelected,
    unselected: lampNewUnselected,
  },
  'Lâmpada acesa durante o dia': {
    selected: lampMoorningSelected,
    unselected: lampMoorningUnselected,
  },
  'Lâmpada apagada': {
    selected: lampNightSelected,
    unselected: lampNightUnselected,
  },
  'Lâmpada Oscilando': {
    selected: lampOscillationSelected,
    unselected: lampOscillationUnselected,
  },
  'Medições com erro': {
    selected: lampErrorSelected,
    unselected: lampErrorUnselected,
  },
  'Problema não especificado': {
    selected: lampUnspecifiedSelected,
    unselected: lampUnspecifiedUnselected,
  },
  Vandalismo: {
    selected: lampBrokenSelected,
    unselected: lampBrokenUnselected,
  },
  Outros: {
    selected: lampOthersSelected,
    unselected: lampOthersUnselected,
  },
};

interface RouteParams {
  address: string;
  latitude: number;
  longitude: number;
}

const SelectTypeAndImage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { address, latitude, longitude } = route.params as RouteParams;

  const { user } = useAuth();

  const [problemsTypes, setProblemsTypes] = useState<ProblemType[]>([]);
  const [fullAddress, setFullAddress] = useState<AddressResponse>();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const [problemTypeId, setProblemTypeId] = useState<number>();
  const [obs, setObs] = useState('');
  const [imageName, setImageName] = useState('');

  useFocusEffect(
    useCallback(() => {
      const loadProblemsTypes = async (): Promise<void> => {
        try {
          const { data: responseProblemType } = await api.get<
            ProblemTypeResponse
          >('/cidadao/lista_problema_notificacao_cidadao');

          const responseProblemData = responseProblemType.data;
          const problemsList = responseProblemData.map(
            (item): ProblemType => {
              return {
                id: item.id,
                name: item.nometipoocorrencia,
                icon: icons[item.nometipoocorrencia] || {
                  selected: lampOthersSelected,
                  unselected: lampOthersUnselected,
                },
              };
            },
          );

          setProblemsTypes(problemsList);
        } catch (error) {
          ToastAndroid.showWithGravity(
            'Não foi possível carregar os tipos de problemas.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      };

      const loadAddress = async (): Promise<void> => {
        try {
          const googleAddress = await googleGeocode.getAddressByCoords(
            latitude,
            longitude,
          );

          setFullAddress(googleAddress);
        } catch (error) {
          ToastAndroid.showWithGravity(
            'Não conseguimos carregar sua localização atual. Certique-se que esteja conectado a internet.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      };

      loadProblemsTypes();
      loadAddress();
    }, [latitude, longitude]),
  );

  if (loading) {
    return <Loading message={loadingMessage || 'Carregando...'} />;
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!fullAddress) {
        Alert.alert(
          'Atenção',
          'Não é possível cadastrar seu problema, pois não conseguimos carregar sua localização atual. Tente novamente.',
        );
        return;
      }

      if (!problemTypeId) {
        Alert.alert('Atenção', 'Para continuar, informe o tipo do problema.');
        return;
      }

      setLoading(true);
      setLoadingMessage('Salvando o problema informado...');

      let imageUrl =
        'https://firebasestorage.googleapis.com/v0/b/websilup.appspot.com/o/Ponto%2Fphoto10.jpg?alt=media&token=e74e3e5a-ee2b-4d5e-9ea8-db0cd325c56d';
      if (imageName) {
        imageUrl = await firebaseStorage.uploadFile(imageName);
      }

      await api.post('/cidadao/criar_notificacao_cidadao', null, {
        params: {
          cpf_cnpj: user.cpfCnpj,
          bairro: fullAddress.district,
          cidade: fullAddress.city,
          uf: fullAddress.state,
          endereco: address,
          latitude,
          longitude,
          observacao: obs,
          url_imagem: imageUrl,
          fk_tipo_ocorrencia: problemTypeId,
        },
      });

      setLoading(false);

      navigation.reset({
        routes: [{ name: 'NotificationCreateCreated' }],
        index: 0,
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Ocorreu um erro ao cadastrar o problema. Tente novamente.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );

      setLoadingMessage('');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <ScrollView>
        <Container>
          <Header>
            <CurrentLocationContainer>
              <CurrentLocationHeader>
                <FontAwesome5 name="map-marker-alt" size={16} color="#E94560" />
                <CurrentLocationTitle>
                  Localização informada
                </CurrentLocationTitle>
              </CurrentLocationHeader>
              <CurrentLocationAddress>{address}</CurrentLocationAddress>
            </CurrentLocationContainer>
          </Header>

          <ProblemTypeTitle>Informe o tipo do problema</ProblemTypeTitle>

          <View>
            <ProblemTypeList
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              data={problemsTypes}
              renderItem={({ item }) => (
                <ProblemTypeItem onPress={() => setProblemTypeId(item.id)}>
                  <ProblemTypeIcon
                    source={
                      problemTypeId === item.id
                        ? item.icon.selected
                        : item.icon.unselected
                    }
                  />
                  <ProblemTypeName>{item.name}</ProblemTypeName>
                </ProblemTypeItem>
              )}
            />
          </View>

          <InputImage
            label="Tire uma foto do problema."
            onImageCapture={(image) => setImageName(image.name)}
          />

          <InputText
            multiline
            placeholder="Alguma observação?"
            onChangeText={(text) => setObs(text)}
          />

          <Button label="SALVAR" loading={loading} onPress={handleSubmit} />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SelectTypeAndImage;
