import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

import { Container } from './styles';

interface ButtonFloatProps extends RectButtonProperties {
  icon: string;
}

const ButtonFloat: React.FC<ButtonFloatProps> = ({ icon, ...rest }) => {
  return (
    <Container {...rest}>
      <FontAwesome5 name={icon} size={24} color="#FFF" />
    </Container>
  );
};

export default ButtonFloat;
