import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestGet, setToken, getAccessToken, ACCESS_TOKEN_EXPIRE_TIME } from '../../lib/api/api';
import { login, logout } from '../../store/LoginSlice';
import Swal from 'sweetalert2';
import homelogo from './homelogo.png'

const Header = () => {
  const isLogin = useSelector(state=>{
    return state.login.isLogin;
  })
  const [nickname, setNickname] = useState('');
const dispatch = useDispatch();
const navigate = useNavigate()
  useEffect(() => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      setToken();
      requestGet(`member/info`)
        .then((res) => {
          console.log(res, 'from HeaderContainer');
          console.log(res.data.baseResponseDto.statusCode);
          if (res.data.baseResponseDto.statusCode === 200) {
            setNickname(res.data.member.nickname);
            dispatch(login());
            setTimeout(getAccessToken, ACCESS_TOKEN_EXPIRE_TIME);
          } else if (res.data.baseResponseDto.statusCode === 401) {
            Swal.fire({
              title: `<div style="font-size: 16px; font-weight: 700">${res.data.baseResponseDto.msg}</div>`,
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

  return (
    <SLayout>
      <SContainer>
        <SLogoBox>
          <Link to="/"><STitle src={`${homelogo}`}/></Link>       
        </SLogoBox>
        <SNav>
          <li><SNavLink to="/store">Store</SNavLink></li>
          <li><SNavLink to="/auction">Auction</SNavLink></li>
          <li><SNavLink to="/tech">Tech</SNavLink></li>
          <li><SNavLink to="/free">Free</SNavLink></li>
        </SNav>
          {isLogin ? <SLoginLink to="/my-page">{nickname}</SLoginLink> : <SLoginLink to="/login">{nickname}</SLoginLink>}
        
      </SContainer>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
`;

const SContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
  align-items: flex-end;
`;

const SLogoBox = styled.div`
  display: flex;
  align-items: end;
  padding-left: 100px;
`;

const STitle = styled.img`
  width: 222px;
`;

const SLoginLink = styled(Link)`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  padding: 20px 100px;
`;

const SNavLink = styled(NavLink)`
  color: black;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &.active {
    color: ${colors.deepPrimary};
    font-weight: 700;
    text-decoration-line: underline;
  }
`;

const SNav = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding-bottom: 10px;

  li {
    color: black;
    font-size: 16px;
    font-weight: 500;
    padding: 10px;
  }
`;

export default Header;
