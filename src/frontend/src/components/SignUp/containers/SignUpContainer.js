import React, { useEffect, useState } from 'react';
import SignUp from '../SignUp';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    nickName: '',
    studentNo: '',
    depart: '',
    ordinal: '',
    phoneNumber: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const onChangeEmail = (e) => {
    setForm({ ...form, email: e.target.value });
  };
  const onChangePassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const onChangeName = (e) => {
    setForm({ ...form, name: e.target.value });
  };
  const onChangeNickName = (e) => {
    setForm({ ...form, nickName: e.target.value });
  };
  const onChangeStudentNo = (e) => {
    setForm({ ...form, studentNo: e.target.value });
  };
  const onChangeDepart = (e) => {
    setForm({ ...form, depart: e.target.value });
  };
  const onChangeOrdinal = (e) => {
    setForm({ ...form, ordinal: e.target.value });
  };
  const onChangePhoneNumber = (e) => {
    setForm({ ...form, phoneNumber: e.target.value });
  };

  const onClickEmailAuthBtn = () => {
    if (form.email) {
      // 나중엔 이메일 유효성검사가 제대로 되었는지 조건 확인 후 클릭 가능하게
      alert(form.email + '인증버튼 클릭');
    }
  };

  const onClickSignUpBtn = () => {
    if (
      form.email &&
      form.password &&
      form.name &&
      form.nickName &&
      form.studentNo &&
      form.depart &&
      form.ordinal &&
      form.phoneNumber &&
      isMatch
    ) {
      // 회원가입 api 호출
      console.log(form, isMatch);
      navigate('/', { replace: true }); // 이동한 home으로 history를 초기화하고 싶음.
    }
  };

  const onClickBackBtn = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (passwordConfirm) {
      if (form.password !== passwordConfirm) {
        setPasswordConfirmMsg('비밀번호가 일치하지 않습니다.');
        setIsMatch(false);
      } else {
        setPasswordConfirmMsg('');
        setIsMatch(true);
      }
    } else {
      setPasswordConfirmMsg('');
      setIsMatch(false);
    }
  }, [passwordConfirm, form.password]);

  return (
    <SignUp
      form={form}
      setForm={setForm}
      passwordConfirmMsg={passwordConfirmMsg}
      isMatch={isMatch}
      passwordConfirm={passwordConfirm}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangePasswordConfirm={onChangePasswordConfirm}
      onChangeName={onChangeName}
      onChangeNickName={onChangeNickName}
      onChangeStudentNo={onChangeStudentNo}
      onChangeDepart={onChangeDepart}
      onChangeOrdinal={onChangeOrdinal}
      onChangePhoneNumber={onChangePhoneNumber}
      onClickSignUpBtn={onClickSignUpBtn}
      onClickBackBtn={onClickBackBtn}
      onClickEmailAuthBtn={onClickEmailAuthBtn}
    />
  );
};

export default SignUpContainer;
