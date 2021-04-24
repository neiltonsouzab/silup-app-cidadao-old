import styled from 'styled-components/native';

export const Container = styled.View`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;

  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 0 32px;
`;

export const Content = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  background: #fff;
`;
