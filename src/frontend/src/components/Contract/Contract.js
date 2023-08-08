import React from 'react';
import { styled } from 'styled-components';
import TermsContainer from '../Common/containers/TermsContainer';

const Contract = () => {
  return (
    <>
      <SBackground />
      <SLayout>
        <STitle>계약서</STitle>
        <TermsContainer title={'전자상거래 표준약관'} text={'약관 내용'} />
      </SLayout>
    </>
  );
};

const SBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 80;
`;

const SLayout = styled.div`
  width: 650px;
  height: 600px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 90;
  background-color: white;
  padding: 10px;
  overflow: hidden;
`;

const STitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 32px;
  font-weight: 700;
  margin-top: 50px;
`;

export default Contract;
