import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';

import AppRoutes from './app.stack.routes';
import AuthRoutes from './auth.stack.routes';

const Routes: React.FC = () => {
  const { user, loading, codeChecked } = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#E94560" />;
  }

  return user && codeChecked ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
