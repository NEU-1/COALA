import React from 'react';
import { styled } from 'styled-components';

const NotFound = () => {
  return <SLayout>NotFound</SLayout>;
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  color: white;
  font-size: 64px;
  font-weight: 700;
`;

export default NotFound;
