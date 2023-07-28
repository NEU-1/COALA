import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';

const SignUp = ({
  form,
  passwordConfirmMsg,
  isMatch,
  passwordConfirm,
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirm,
  onChangeName,
  onChangeNickName,
  onChangeStudentNo,
  onChangeDepart,
  onChangeOrdinal,
  onChangePhoneNumber,
  onClickSignUpBtn,
  onClickBackBtn,
  onClickEmailAuthBtn,
}) => {
  return (
    <SLayout>
      <SContainer>
        <STitle>coala</STitle>
        <SContentsContainer>
          <SInputEmail>
            <input
              type="text"
              placeholder="이메일"
              value={form.email}
              onChange={onChangeEmail}
            />
            <button onClick={onClickEmailAuthBtn}>인증</button>
          </SInputEmail>
          <SInput
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={onChangePassword}
          />
          <SInputWithConfirmMsg isMatch={isMatch}>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            <div>{!passwordConfirmMsg ? <>&nbsp;</> : passwordConfirmMsg}</div>
          </SInputWithConfirmMsg>

          <SInput
            type="text"
            placeholder="이름"
            value={form.name}
            onChange={onChangeName}
          />
          <SInput
            type="text"
            placeholder="별명"
            value={form.nickName}
            onChange={onChangeNickName}
          />
          <SInput
            type="text"
            placeholder="학번"
            value={form.studentNo}
            onChange={onChangeStudentNo}
          />
          <SSelectBox>
            <SSelect defaultValue={'placeholder'} onChange={onChangeDepart}>
              <option
                className="placeholder"
                value={'placeholder'}
                disabled
                hidden
              >
                지역(캠퍼스)
              </option>
              <option value={'서울'}>서울</option>
              <option value={'대전'}>대전</option>
              <option value={'구미'}>구미</option>
              <option value={'광주'}>광주</option>
              <option value={'부울경'}>부울경</option>
            </SSelect>
            <SSelect defaultValue={'placeholder'} onChange={onChangeOrdinal}>
              <option
                className="placeholder"
                value={'placeholder'}
                disabled
                hidden
              >
                기수
              </option>
              <option value={9}>9기</option>
              <option value={10}>10기</option>
            </SSelect>
          </SSelectBox>
          <SInput
            type="text"
            placeholder="전화번호"
            value={form.phoneNumber}
            onChange={onChangePhoneNumber}
          />
        </SContentsContainer>
        <SBtnContainer>
          <SBtn onClick={onClickBackBtn}>뒤로 가기</SBtn>
          <SBtn color={`${colors.primary}`} onClick={onClickSignUpBtn}>
            회원가입
          </SBtn>
        </SBtnContainer>
      </SContainer>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
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
  margin-top: 100px;
  color: ${colors.primary};
  font-size: 64px;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const SContentsContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const SInput = styled.input`
  width: 400px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  margin-bottom: 40px;
`;

const SInputWithConfirmMsg = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  input {
    width: 400px;
    height: 40px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    margin-bottom: 10px;
  }

  div {
    color: #fb1818;
    font-size: 12px;
    font-weight: 500;
    padding: 5px;
    visibility: ${(props) => (props.isMatch ? 'hidden' : 'visible')};
  }
`;

const SInputEmail = styled.div`
  display: flex;
  gap: 27px;
  justify-content: space-between;
  margin-bottom: 40px;

  input {
    display: flex;
    width: 287px;
    height: 40px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }

  button {
    display: flex;
    padding: 0px 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 7px;
    background: ${colors.primary};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: white;
    cursor: pointer;
  }
`;

const SSelectBox = styled.div`
  display: flex;
  width: 400px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
`;

const SSelect = styled.select`
  width: 50%;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
`;

const SBtnContainer = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 100px;
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

export default SignUp;
