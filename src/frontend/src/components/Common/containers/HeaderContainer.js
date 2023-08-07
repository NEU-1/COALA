import React from 'react';
import Header from '../Header';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../../store/LoginSlice';
import { useEffect } from 'react';
import { requestGet, setToken } from '../../../lib/api/api';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, ACCESS_TOKEN_EXPIRE_TIME } from '../../../lib/api/api';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => {
    return state.login.isLogin;
  });

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      setToken();
      requestGet(`member/info`)
        .then((res) => {
          console.log(res, 'from HeaderContainer');
          if (res.data.statusCode === 200) {
            setNickname(res.data.nickname);
            dispatch(login());
            setTimeout(getAccessToken, ACCESS_TOKEN_EXPIRE_TIME);
          } else if (res.data.statusCode === 401) {
            Swal.fire({
              title: `<div style="font-size: 16px; font-weight: 700">${res.data.msg}</div>`,
            }).then(() => {
              dispatch(logout());
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              navigate('/login', { replace: true });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setNickname('로그인');
    }
  }, [isLogin]);

  return <Header isLogin={isLogin} nickname={nickname} />;
};

export default HeaderContainer;
