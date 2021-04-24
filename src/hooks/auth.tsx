import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface ResponseSignIn {
  status: boolean;
  mensagem: string;
  dados: {
    nomepessoa: string;
    cpf_cnpj: string;
    telefone_celular1: string;
  };
}

interface ResponseSignUp {
  status: boolean;
  mensagem: string;
}

interface User {
  cpfCnpj: string;
  name: string;
  whatsapp: string;
}

interface AuthState {
  user: User;
  codeChecked: boolean;
}

interface SignCredentials {
  cpfCnpj: string;
}

interface SignUpData {
  cpfCnpj: string;
  name: string;
  whatsapp: string;
  email: string;
}

interface CheckCodeProps {
  code: string;
  cpfCnpj: string;
}

interface AuthContextData {
  user: User;
  codeChecked: boolean;
  loading: boolean;
  signIn(credentials: SignCredentials): Promise<void>;
  signUp(data: SignUpData): Promise<void>;
  checkCode(data: CheckCodeProps): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await AsyncStorage.getItem('@silupcitizen:user');
      const codeChecked = await AsyncStorage.getItem(
        '@silupcitizen:codeChecked',
      );

      if (user && codeChecked) {
        const parsedUser = JSON.parse(user) as User;
        const parsedCodeChecked = JSON.parse(codeChecked) as boolean;

        api.defaults.params = {
          cpf_cnpj: parsedUser.cpfCnpj,
        };

        setData({
          user: parsedUser,
          codeChecked: parsedCodeChecked,
        });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ cpfCnpj }: SignCredentials) => {
    const response = await api.get<ResponseSignIn>(
      '/cidadao/consulta_cpf_cidadao',
      {
        params: {
          cpf_cnpj: cpfCnpj,
        },
      },
    );

    const { status, mensagem, dados } = response.data;

    if (!status) {
      throw Error(mensagem);
    }

    const user = {
      cpfCnpj,
      name: dados.nomepessoa,
      whatsapp: dados.telefone_celular1,
    };

    await AsyncStorage.setItem('@silupcitizen:user', JSON.stringify(user));
    await AsyncStorage.setItem(
      '@silupcitizen:codeChecked',
      JSON.stringify(false),
    );

    api.defaults.params = {
      cpf_cnpj: user.cpfCnpj,
    };

    setData({
      user,
      codeChecked: false,
    });
  }, []);

  const signUp = useCallback(
    async ({ cpfCnpj, name, whatsapp, email }: SignUpData) => {
      const response = await api.post<ResponseSignUp>(
        '/cidadao/criar_pessoa_cidadao',
        null,
        {
          params: {
            cpf_cnpj: cpfCnpj,
            nomepessoa: name,
            telefone_celular1: whatsapp,
            email,
          },
        },
      );

      const { status, mensagem } = response.data;

      if (!status) {
        throw new Error(mensagem);
      }

      const user = {
        cpfCnpj,
        name,
        whatsapp,
      };

      await AsyncStorage.setItem('@silupcitizen:user', JSON.stringify(user));
      await AsyncStorage.setItem(
        '@silupcitizen:codeChecked',
        JSON.stringify(false),
      );

      api.defaults.params = {
        cpf_cnpj: user.cpfCnpj,
      };

      setData({
        user,
        codeChecked: false,
      });
    },
    [],
  );

  const checkCode = useCallback(async ({ code, cpfCnpj }: CheckCodeProps) => {
    const response = await api.post('/cidadao/validar_codigo_cidadao', {
      cpf_cnpj: cpfCnpj,
      codigo: code,
    });

    const { status, mensagem } = response.data;

    if (!status) {
      throw Error(mensagem);
    }

    await AsyncStorage.setItem(
      '@silupcitizen:codeChecked',
      JSON.stringify(true),
    );

    setData((state) => ({
      ...state,
      codeChecked: true,
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        codeChecked: data.codeChecked,
        loading,
        signIn,
        signUp,
        checkCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
