import React from 'react';
import { styled } from 'styled-components';

const Home = () => {
  return(
    <SLayout>
      <div>Home</div>
    </SLayout>
  )
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
`;

export default Home;
