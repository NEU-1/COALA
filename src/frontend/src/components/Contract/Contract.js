import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import TermsContainer from '../Common/containers/TermsContainer';
import SignatureContainer from './containers/SignatureContainer';
import CButton from '../Common/CButton';

import DaeYou from '../../assets/DaeYou.txt'
import PyoJun from '../../assets/PyoJun.txt'

const Contract = ({
  contractForm,
  producer_sign,
  producer,
  consumer,
  post,
  myId,
  priceFormat,
  dateFormat,
  producerSignRef,
  consumerSignRef,
  isAgree1,
  isAgree2,
  onChangeAgree1,
  onChangeAgree2,
  onClickSendBtn,
  onChangeRentalCost,
  onChangeDeposit,
  onChangeRentalDate,
  onChangePeriod,
  onChangeProductName,
  onChangeAccount,
  onClickClose,
  onClickFinishBtn,
}) => {
  const [PyoJunContent, setPyoJunContent] = useState("");
  const [DaeYouContent, setDaeYouContent] = useState("");

  useEffect(() => {
    fetch(PyoJun)  // PyoJun이 .txt 파일의 URL일 경우
        .then(response => response.text())
        .then(data => {
            const renderedContent = renderContent(data);
            setPyoJunContent(renderedContent);
        });
    fetch(DaeYou)  // PyoJun이 .txt 파일의 URL일 경우
        .then(response => response.text())
        .then(data => {
            const renderedContent = renderContent(data);
            setDaeYouContent(renderedContent);
        });

}, []);
  

  const renderContent = (content) => {
    // 여기서 content를 원하는대로 처리하실 수 있습니다.
    // 예를 들면, 볼드 처리를 하거나 다른 파싱 작업을 수행하실 수 있습니다.
    // 현재 예시에서는 그냥 원본 내용을 그대로 반환하도록 합니다.
    return content;
  };

  return (
    <>
      <SBackground onClick={onClickClose} />
      <SLayout>
        <STitle>계약서</STitle>
        <TermsContainer
          title={'전자상거래 표준약관'}
          text={
            PyoJunContent
          }
          checked={isAgree1}
          onChange={onChangeAgree1}
        />
        <TermsContainer
          title={'코알라 대여약관'}
          text={DaeYouContent}
          checked={isAgree2}
          onChange={onChangeAgree2}
        />
        <SContractContent>
          <SSubTitle>계약 내용</SSubTitle>
          <SSubContent>
            <div className="title">[계약자]</div>
            <STable1>
              <tr>
                <td className="tableHead">제공자</td>
                <td className="tableData">{producer.name}</td>
                <td className="tableHead">대여자</td>
                <td className="tableData">{consumer.name}</td>
              </tr>
            </STable1>
          </SSubContent>
          <SSubContent>
            <div className="title">[계약조건]</div>
            <STable2 isDisable={myId === consumer.id}>
              <tr>
                <td className="tableHead">제품명</td>
                <td className="tableData">
                  <input
                    type="text"
                    value={contractForm.productName}
                    onChange={onChangeProductName}
                  />
                </td>
              </tr>
              <tr>
                <td className="tableHead">계약기간</td>
                <td className="tableData">
                  {myId === producer.id && (
                    <input type="date" onChange={onChangeRentalDate} />
                  )}
                  {myId === consumer.id &&
                    contractForm.return_at &&
                    dateFormat(contractForm.rental_at)}
                  &nbsp; ~ &nbsp;
                  {contractForm.return_at && dateFormat(contractForm.return_at)}
                  (
                  <input
                    type="number"
                    className="period"
                    value={contractForm.period}
                    onChange={onChangePeriod}
                  />
                  일)
                </td>
              </tr>
              <tr>
                <td className="tableHead">대여료</td>
                <td className="tableData">
                  <input
                    type="number"
                    value={contractForm.rental_cost}
                    onChange={onChangeRentalCost}
                  />
                  원
                </td>
              </tr>
              <tr>
                <td className="tableHead">보증금</td>
                <td className="tableData">
                  <input
                    type="number"
                    value={contractForm.deposit}
                    onChange={onChangeDeposit}
                  />
                  원
                </td>
              </tr>
            </STable2>
          </SSubContent>
          <SSubContent>
            <div className="title">[납부]</div>
            <STable2 isDisable={myId === consumer.id}>
              <tr>
                <td className="tableHead">계좌</td>
                <td className="tableData">
                  <input
                    type="text"
                    value={contractForm.account}
                    onChange={onChangeAccount}
                  />
                </td>
              </tr>
              <tr>
                <td className="tableHead">납부금액</td>
                <td className="tableData">
                  {contractForm.period &&
                    priceFormat(
                      Number(contractForm.deposit) +
                        Number(contractForm.rental_cost) * contractForm.period
                    )}
                  &nbsp;원
                </td>
              </tr>
            </STable2>
          </SSubContent>
        </SContractContent>
        <div className="agreement">위 계약에 동의합니다.</div>
        <SContractSign>
          {myId === producer.id ? (
            <SignatureContainer
              name={`${producer.name}`}
              who="제공자(인)"
              ref={producerSignRef}
              isDisable={consumer.id === myId}
            />
          ) : (
            <SProducerSign>
              <SName>{producer.name}</SName>
              <SSignImg src={producer_sign} />
            </SProducerSign>
          )}
          <SignatureContainer
            name={`${consumer.name}`}
            who="대여자(인)"
            ref={consumerSignRef}
            isDisable={producer.id === myId}
          />
        </SContractSign>
        <SContractDate>{dateFormat(contractForm.created_at)}</SContractDate>
        <SBtnContainer>
          <CButton text={'취소'} bgColor={'#d9d9d9'} onClick={onClickClose} />
          {producer.id === myId && (
            <CButton text={'전송'} onClick={onClickSendBtn} />
          )}
          {consumer.id === myId && (
            <CButton text={'완료'} onClick={onClickFinishBtn} />
          )}
        </SBtnContainer>
      </SLayout>
    </>
  );
};

const SBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 80;
`;

const SLayout = styled.div`
  width: 650px;
  height: 650px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 90;
  background-color: white;
  padding: 20px;
  overflow: auto;

  .agreement {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
  }
`;

const STitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 32px;
  font-weight: 700;
  margin-top: 70px;
`;

const SContractContent = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const SSubTitle = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const SSubContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 100%;

  .title {
    color: #000;
    font-size: 16px;
    font-weight: 700;
  }
`;

const STable1 = styled.table`
  width: 100%;
  display: flex;
  text-align: center;
  border: 1px solid black;
  border-spacing: 0px;

  .tableHead {
    width: 95px;
    padding: 10px 0px;
    background: ${colors.primary};
    color: #000;
    font-size: 16px;
    font-weight: 700;
  }

  .tableData {
    width: 199px;
    padding: 10px 0px;
    gap: 10px;
  }
`;

const STable2 = styled.div`
  width: 100%;
  text-align: center;
  border: 1px solid black;
  border-spacing: 0px;

  tr {
    width: 100%;
  }

  .tableHead {
    width: 95px;
    padding: 10px 0px;
    background: ${colors.primary};
    color: #000;
    font-size: 16px;
    font-weight: 700;
  }

  .tableData {
    width: 495px;
    padding: 10px 0px;
    gap: 10px;
    pointer-events: ${(props) => (props.isDisable ? 'none' : 'auto')};

    input[type='number'] {
      font-size: 16px;
      width: 70px;
      text-align: center;
    }

    input[type='date'] {
      font-size: 16px;
      text-align: center;
    }

    input[type='text'] {
      font-size: 16px;
      width: 100%;
      text-align: center;
    }
  }
`;

const SContractDate = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 22px;
  font-weight: 700;
`;

const SContractSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 60px;
  padding: 10px 20px;
`;

const SBtnContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SProducerSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SName = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const SSignImg = styled.img`
  width: 121px;
  height: 61px;
  background: #fff;
  border: 1px solid ${colors.middlePrimary};
  border-radius: 10px;
`;

export default Contract;
