import React from 'react';
import { styled } from 'styled-components';
import { Link, Outlet } from 'react-router-dom';

const MyPage = () => {
  // 추후 수정 필요(outlet써야 할듯?)
  return (
    <SLayout>
      <div>MyPage</div>
<<<<<<< HEAD
      <Link to="/modify-userinfo">회원정보 수정</Link>
=======
      <Link to="/my-page/modify-userinfo">회원정보 수정</Link>
      <Outlet />
>>>>>>> ad5ca11fde5f06982b5a12e130700b06895e3e4c
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
`;

export default MyPage;
