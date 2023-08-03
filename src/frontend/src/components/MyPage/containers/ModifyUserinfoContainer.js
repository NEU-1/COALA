import React, { useState, useEffect } from 'react';
import ModifyUserinfo from '../ModifyUserinfo';
import { useNavigate } from 'react-router-dom';

const ModifyUserinfoContainer = () => {
  const navigate = useNavigate();
  // 더미 데이터
  const [form, setForm] = useState({
    email: 'coala1080@gmail.com',
    password: '',
    name: '코알라',
    nickname: '코딩장비 알아보고 나눠쓰고',
    studentId: '1234567',
    depart: '구미',
    ordinal: 9,
    phoneNo: '010-1234-5678',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const onChangePassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const onChangeNickname = (e) => {
    setForm({ ...form, nickName: e.target.value });
  };

  const onClickModifyBtn = () => {
    if (form.password && form.nickName && isMatch) {
      // 회원정보 수정 api 호출
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

  useEffect(() => {
    // 유저 정보를 가져와서 form에 저장
  }, []);

  return (
    <ModifyUserinfo
      form={form}
      setForm={setForm}
      passwordConfirmMsg={passwordConfirmMsg}
      isMatch={isMatch}
      passwordConfirm={passwordConfirm}
      onChangePassword={onChangePassword}
      onChangePasswordConfirm={onChangePasswordConfirm}
      onChangeNickname={onChangeNickname}
      onClickModifyBtn={onClickModifyBtn}
      onClickBackBtn={onClickBackBtn}
    />
  );
};

export default ModifyUserinfoContainer;
