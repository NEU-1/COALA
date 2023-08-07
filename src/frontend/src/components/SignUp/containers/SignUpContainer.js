import React, { useEffect, useState } from 'react';
import SignUp from '../SignUp';
import { useNavigate } from 'react-router-dom';
import { requestPost } from '../../../lib/api/api';
import Swal from 'sweetalert2';

const SignUpContainer = () => {
  const navigate = useNavigate();
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
  const [isAuthEmail, setIsAuthEmail] = useState(false);

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
  const onChangeNickname = (e) => {
    setForm({ ...form, nickname: e.target.value });
  };
  const onChangeStudentId = (e) => {
    setForm({ ...form, studentId: e.target.value });
  };
  const onChangeDepart = (e) => {
    setForm({ ...form, depart: e.target.value });
  };
  const onChangeOrdinal = (e) => {
    setForm({ ...form, ordinal: e.target.value });
  };
  const onChangePhoneNo = (e) => {
    setForm({ ...form, phoneNo: e.target.value });
  };

  // 회원가입 이메일 인증 (이메일, 이름, 학번 필요)
  const onClickEmailAuthBtn = () => {
    // 모든 정보가 입력된 경우
    if (form.email && form.name && form.studentId) {
      let emailAvailable = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+.[A-Za-z0-9-]+/;
      let studentNoAvailable = /^[0-9]+/;
      // 이메일 유효성검사
      if (emailAvailable.test(form.email) === false) {
        Swal.fire({
          icon: 'warning',
          title:
            '<div style="font-size: 16px; font-weight: 700">유효하지 않은 이메일 형식입니다.</div>',
        });
      }
      // 학번 유효성 검사
      else if (studentNoAvailable.test(form.studentId) === false) {
        Swal.fire({
          icon: 'warning',
          title:
            '<div style="font-size: 16px; font-weight: 700">유효하지 않은 학번 형식입니다.</div>',
        });
      } else authEmail(form.email);
    }
    // 정보가 입력되지 않은 경우
    else {
      Swal.fire({
        title:
          '<div style="font-size: 16px; font-weight: 700">이메일 인증을 위해 이메일, 이름, 학번을 입력해주세요.</div>',
        width: '450px',
      });
    }
  };

  const authEmail = () => {
    requestPost(`member/email-certification`, {
      email: form.email,
      name: form.name,
      studentId: form.studentId,
      type: 'certification',
    })
      .then(() => {
        checkOtp();
      })
      .catch((err) => {
        if (err.response.data.statusCode === 400) {
          Swal.fire({
            title: `<div style="font-size: 16px; font-weight: 700">${err.response.data.msg}</div>`,
          });
        } else if (err.response.status === 500) {
          Swal.fire({
            title: `<div style="font-size: 16px; font-weight: 700">예상치 못한 오류가 발생하였습니다.</div>`,
            icon: 'error',
          }).then(() => {
            navigate('/', { replace: true });
          });
        }
      });
  };

  const checkOtp = () => {
    Swal.fire({
      title:
        '<div style="font-size: 20px; font-weight: 700">인증 번호가 전송되었습니다.</div>',
      text: '인증 번호를 입력해주세요.',
      input: 'text',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: (otp) => {
        if (!otp) return false;
        else return otp;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((otp) => {
      // OK 버튼이 눌렸을 때만 인증번호 확인
      if (otp.isConfirmed) {
        requestPost(`member/certification`, {
          email: form.email,
          otp: otp.value,
          type: 'certification',
        })
          .then((res) => {
            console.log(res);
            if (res.data.statusCode === 200) {
              if (res.data.detail === 201) {
                setIsAuthEmail(true);
                Swal.fire({
                  title: `<div style="font-size: 16px; font-weight: 700">${res.data.msg}</div>`,
                });
              } else if (res.data.detail === 204) {
                Swal.fire({
                  title: `<div style="font-size: 20px; font-weight: 700">${res.data.msg}</div>`,
                  text: '다시 인증해주세요.',
                });
              } else {
                Swal.fire({
                  title: `<div style="font-size: 16px; font-weight: 700">${res.data.msg}</div>`,
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: `<div style="font-size: 16px; font-weight: 700">예상치 못한 오류가 발생하였습니다.</div>`,
            });
          });
      }
    });
  };

  const onClickSignUpBtn = () => {
    if (
      form.email &&
      form.password &&
      form.name &&
      form.nickname &&
      form.studentId &&
      form.depart &&
      form.ordinal &&
      form.phoneNo &&
      isMatch &&
      isAuthEmail
    ) {
      // 회원가입 api 호출
      requestPost(`member/signup`, form)
        .then((res) => {
          console.log('success', res);
          if (res.data.statusCode === 201) {
            Swal.fire({
              title: `<div style="font-size: 16px; font-weight: 700">${res.data.msg}</div>`,
            }).then(() => {
              navigate('/login', { replace: true });
            });
          }
        })
        .catch((err) => {
          if (err.response.data.statusCode === 400) {
            Swal.fire({
              title: `<div style="font-size: 16px; font-weight: 700">${err.response.data.msg}</div>`,
            });
          }
        });
    } else {
      // 입력되지 않은 정보 존재.
      if (
        !form.email ||
        !form.password ||
        !form.name ||
        !form.nickname ||
        !form.studentId ||
        !form.depart ||
        !form.ordinal ||
        !form.phoneNo
      ) {
        Swal.fire({
          title:
            '<div style="font-size: 16px; font-weight: 700">모든 정보를 입력해주세요.</div>',
          width: '300px',
        });
      }
      // 비밀번호 불일치
      else if (!isMatch) {
        Swal.fire({
          title:
            '<div style="font-size: 16px; font-weight: 700">비밀번호가 일치하지 않습니다.</div>',
          width: '300px',
        });
      }
      // 이메일 인증하지 않음
      else {
        Swal.fire({
          title:
            '<div style="font-size: 16px; font-weight: 700">이메일 인증을 해주세요.</div>',
          width: '300px',
        });
      }
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
      onChangeNickname={onChangeNickname}
      onChangeStudentId={onChangeStudentId}
      onChangeDepart={onChangeDepart}
      onChangeOrdinal={onChangeOrdinal}
      onChangePhoneNo={onChangePhoneNo}
      onClickSignUpBtn={onClickSignUpBtn}
      onClickBackBtn={onClickBackBtn}
      onClickEmailAuthBtn={onClickEmailAuthBtn}
    />
  );
};

export default SignUpContainer;
