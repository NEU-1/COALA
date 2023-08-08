import React, { useState } from 'react';
import { styled } from 'styled-components';
import ContractContainer from '../Contract/containers/ContractContainer';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onChangeModalFlag = () => {
    setIsOpen(!isOpen);
  }
  return(
    <SLayout>
      <div>Home</div>
      <button onClick={onChangeModalFlag}>계약서(임의)</button>

      {isOpen && <ContractContainer onChangeModalFlag={onChangeModalFlag}/>}
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
