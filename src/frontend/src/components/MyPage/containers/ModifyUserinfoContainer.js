import React, { useState, useEffect } from 'react';
import ModifyUserinfo from '../ModifyUserinfo';
import { useNavigate } from 'react-router-dom';
import { requestGet, requestPut } from '../../../lib/api/api';
import Swal from 'sweetalert2';

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
    if (form.password && form.nickname && isMatch) {
      // 회원정보 수정 api 호출
      console.log(form, isMatch);
      requestPut(`member/update-info`, {
        nickname: form.nickname,
        password: form.password,
      }).then((res) => {
        if (res.data.statusCode === 200) {
          Swal.fire({
            title: `<div style="font-size: 20px; font-weight: 700">${res.data.msg}</div>`,
            text: '다시 로그인 해주세요.',
          }).then(() => {
            //로그아웃 처리
            navigate('/login', { replace: true }); // 이동한 로그인 페이지로 history를 초기화하고 싶음.
          });
        } else if (res.data.statusCode === 401) {
          Swal.fire({
            title: `<div style="font-size: 20px; font-weight: 700">${res.data.msg}</div>`,
          }).then(() => {
            //로그아웃 처리
            navigate('/login', { replace: true }); // 이동한 로그인 페이지로 history를 초기화하고 싶음.
          });
        }
      });
    }
  };

  const onClickBackBtn = () => {
    navigate(-1);
  };

  // 비밀번호, 비밀번호 확인에 값이 변할 경우 둘의 일치여부 확인
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
    requestGet(`member/info`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data);
          setForm({ ...form, email: res.data.email });
          setForm({ ...form, name: res.data.name });
          setForm({ ...form, nickname: res.data.nickname });
          setForm({ ...form, studentId: res.data.studentId });
          setForm({ ...form, depart: res.data.depart });
          setForm({ ...form, phoneNo: res.data.phoneNo });
        } else if (res.data.statusCode === 401) {
          Swal.fire({
            title: `<div style="font-size: 16px; font-weight: 700">${res.data.msg}</div>`,
          }).then(() => {
            //로그아웃 처리
            navigate('/login', { replace: true });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (
    form.email &&
    form.name &&
    form.nickname &&
    form.studentId &&
    form.depart &&
    form.ordinal &&
    form.phoneNo
  ) {
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
  }
};

export default ModifyUserinfoContainer;
