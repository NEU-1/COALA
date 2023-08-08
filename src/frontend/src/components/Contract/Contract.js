import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import TermsContainer from '../Common/containers/TermsContainer';
import SignatureContainer from './containers/SignatureContainer';
import CButton from '../Common/CButton';

const Contract = ({
  isAgree1,
  isAgree2,
  onChangeAgree1,
  onChangeAgree2,
  onClickSendBtn,
  onChangeModalFlag,
}) => {
  return (
    <>
      <SBackground onClick={onChangeModalFlag} />
      <SLayout>
        <STitle>계약서</STitle>
        <TermsContainer
          title={'전자상거래 표준약관'}
          text={
            '전자상거래(인터넷사이버몰) 표준 약관\n\n제1조 (목적)\n이 약관은 D-1080이 운영하는 COALA 사이버 몰'
          }
          checked={isAgree1}
          onChange={onChangeAgree1}
        />
        <TermsContainer
          title={'코알라 대여약관'}
          text={'분실과 파손 저희 책임 아니에요ㅠㅠ'}
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
                <td className="tableData">강승현</td>
                <td className="tableHead">대여자</td>
                <td className="tableData">심은진</td>
              </tr>
            </STable1>
          </SSubContent>
          <SSubContent>
            <div className="title">[계약조건]</div>
            <STable2>
              <tr>
                <td className="tableHead">제품명</td>
                <td className="tableData">한성 키보드</td>
              </tr>
              <tr>
                <td className="tableHead">계약기간</td>
                <td className="tableData">2023.08.07 ~ 2023.08.08(1일)</td>
              </tr>
              <tr>
                <td className="tableHead">대여료</td>
                <td className="tableData">5,000원</td>
              </tr>
              <tr>
                <td className="tableHead">보증금</td>
                <td className="tableData">20,000원</td>
              </tr>
            </STable2>
          </SSubContent>
          <SSubContent>
            <div className="title">[납부]</div>
            <STable2>
              <tr>
                <td className="tableHead">계좌</td>
                <td className="tableData">신한 110-111-222222</td>
              </tr>
            </STable2>
          </SSubContent>
        </SContractContent>
        <div className="agreement">위 계약에 동의합니다.</div>
        <SContractSign>
          <SignatureContainer name="강승현" who="제공자(인)" />
          <SignatureContainer name="심은진" who="대여자(인)" />
        </SContractSign>
        <SContractDate>2023.08.06</SContractDate>
        <SBtnContainer>
          <CButton text={'취소'} bgColor={'#d9d9d9'} />
          <CButton text={'전송'} onClick={onClickSendBtn} />
        </SBtnContainer>
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
  height: 650px;
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

export default Contract;
