import React, { useState } from 'react';
import { styled } from 'styled-components';
import ContractContainer from '../contract/containers/ContractContainer';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onChangeModalFlag = () => {
    setIsOpen(!isOpen);
  }

  // 카카오페이 테스트 데이터 경로 입니다.
  function payment() {
    var url = 'https://developers.kakao.com/demo/pay/prepare'
    var params = {
        agent: 'web',
        itemCode: '1',
        quantity: '5',
    }
    return url + '?' + '1regjlenrgqlhsajkd'
  }
  // ================

  return(
    <SLayout>
      <div>Home</div>
      <button onClick={onChangeModalFlag}>계약서(임의)</button>
      <a href={payment()}> <img src="/assets/images/payment__small.png" /></a>
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
