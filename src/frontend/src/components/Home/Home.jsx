import React, { useState } from 'react';
import { styled } from 'styled-components';
import ContractContainer from '../contract/containers/ContractContainer';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onChangeModalFlag = () => {
    setIsOpen(!isOpen);
  }
  return(
    <SLayout>
      <div>Home</div>
      <button onClick={onChangeModalFlag}>계약서(임의)</button>
      <a href="https://online-pay.kakao.com/mockup/v1/e62246fe371c4df31784ffa5cb87bd2d004516500936f9581e3eceeed74f8975/info"> <img src="/assets/images/payment.png" /></a>
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
