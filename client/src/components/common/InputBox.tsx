import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
  children: React.ReactNode;
}

const InputBox = ({children}: ContainerProps) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div``;

export default InputBox