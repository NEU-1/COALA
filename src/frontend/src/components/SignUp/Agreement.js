import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import CCheckBox from '../Common/CCheckBox';

const Agreement = ({
  isAgree1,
  isAgree2,
  onChangeAllAgree,
  onChangeAgree1,
  onChangeAgree2,
  onClickNextBtn,
  onClickCloseBtn,
}) => {
  return (
    <SLayout>
      <SContainer>
        <STitle>coala</STitle>
        <SContentsContainer>
          <SAllAgreeBox>
            <CCheckBox
              text={'전체 동의'}
              checked={isAgree1 && isAgree2}
              onChange={onChangeAllAgree}
            />
          </SAllAgreeBox>
          <SAgreementTitle>개인정보 제공 동의</SAgreementTitle>
          <SAgreementContent>
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
          </SAgreementContent>
          <SAgreeBox>
            <CCheckBox
              text={'동의'}
              checked={isAgree1}
              onChange={onChangeAgree1}
            />
          </SAgreeBox>

          <SAgreementTitle>이용약관</SAgreementTitle>
          <SAgreementContent>
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
            동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????동의하실꺼죠????
          </SAgreementContent>
          <SAgreeBox>
            <CCheckBox
              text={'동의'}
              checked={isAgree2}
              onChange={onChangeAgree2}
            />
          </SAgreeBox>
        </SContentsContainer>
        <SBtnContainer>
          <SBtn onClick={onClickCloseBtn}>취소</SBtn>
          <SBtn color={`${colors.primary}`} onClick={onClickNextBtn}>
            다음
          </SBtn>
        </SBtnContainer>
      </SContainer>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SContainer = styled.div`
  display: flex;
  width: 800px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const STitle = styled.div`
  color: ${colors.primary};
  font-size: 64px;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const SContentsContainer = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const SAllAgreeBox = styled.div`
  display: flex;
  padding: 5px;
  align-items: flex-start;
`;

const SAgreeBox = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: flex-end;
  align-items: center;
`;

const SAgreementTitle = styled.div`
  display: flex;
  padding: 0px 10px;
  color: #000;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
`;

const SAgreementContent = styled.div`
  display: flex;
  height: 100px;
  padding: 10px;
  align-items: flex-start;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  white-space: nowpre;
  overflow: auto;
`;

const SBtnContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SBtn = styled.div`
  display: flex;
  height: 50px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.color ? props.color : '#d9d9d9')};
  color: white;
  cursor: pointer;
`;

export default Agreement;
