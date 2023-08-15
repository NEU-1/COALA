import React from 'react';
import { styled } from 'styled-components';

const ChatBlank = () => {
  return <SLayout></SLayout>;
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
`;

export default ChatBlank;
