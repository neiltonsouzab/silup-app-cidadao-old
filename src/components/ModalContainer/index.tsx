import React from 'react';
import { ViewProps } from 'react-native';

import { Container, Content } from './styles';

const ModalContainer: React.FC<ViewProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <Content onTouchStart={(e) => e.stopPropagation()}>{children}</Content>
    </Container>
  );
};

export default ModalContainer;
