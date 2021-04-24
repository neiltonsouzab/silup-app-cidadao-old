import React from 'react';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';

const AppProvider: React.FC = ({ children }) => (
  <ModalProvider>
    <AuthProvider>{children}</AuthProvider>
  </ModalProvider>
);

export default AppProvider;
