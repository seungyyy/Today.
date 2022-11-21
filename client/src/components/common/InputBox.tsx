import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
  children: React.ReactNode;
  title: string;
  onClick?: ()=> void;
}

const InputBox = ({children, title, onClick}: ContainerProps) => {
  return (
    <Container onClick={onClick}>
      <h2 className='blind' >마침 {title}</h2>
      {children}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  .blind {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    margin: -1px;
    width: 1px;
    height: 1px;
  }
`;

export default InputBox