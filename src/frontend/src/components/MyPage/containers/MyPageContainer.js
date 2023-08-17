import React, { useState, useEffect } from 'react';
import MyPage from '../MyPage';
import { requestGet, setToken } from '../../../lib/api/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyPageContainer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  useEffect(() => {
    // 유저 정보를 가져와서 form에 저장
    setToken();
    requestGet(`member/info`)
      .then((res) => {
        console.log(res);
        if (res.data.baseResponseDto.statusCode === 200) {
          console.log(res.data.member);
          setForm(res.data.member);
        } else if (res.data.baseResponseDto.statusCode === 401) {
          Swal.fire({
            title: `<div style="font-size: 16px; font-weight: 700">${res.data.baseResponseDto.msg}</div>`,
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

  if (form) {
    return <MyPage form={form} />;
  }
};

export default MyPageContainer;
