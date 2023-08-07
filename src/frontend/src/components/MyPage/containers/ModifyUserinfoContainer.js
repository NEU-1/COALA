import React, { useState, useEffect } from 'react';
import ModifyUserinfo from '../ModifyUserinfo';
import { useNavigate } from 'react-router-dom';
import { requestGet, requestPut, setToken } from '../../../lib/api/api';
import Swal from 'sweetalert2';

const ModifyUserinfoContainer = () => {
  const navigate = useNavigate();
  // 더미 데이터
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    studentId: '',
    depart: '',
    ordinal: '',
    phoneNo: '',
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
    setForm({ ...form, nickname: e.target.value });
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
    } else {
      if (!form.password || !form.nickname) {
        Swal.fire({
          title: `<div style="font-size: 20px; font-weight: 700">수정하기 위한 필수 입력 사항을 채워주세요.</div>`,
          icon: 'warning',
        });
      } else if (!isMatch) {
        Swal.fire({
          title: `<div style="font-size: 20px; font-weight: 700">비밀 번호 확인해주세요.</div>`,
          icon: 'warning',
        });
      }
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
    setToken();
    requestGet(`member/info`)
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          console.log(res.data);
          setForm({
            ...form,
            email: res.data.email,
            name: res.data.name,
            nickname: res.data.nickname,
            studentId: res.data.studentId,
            depart: res.data.depart,
            ordinal: res.data.ordinal,
            phoneNo: res.data.phoneNo,
          });
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
