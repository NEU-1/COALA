import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
  // 추후 수정 필요(outlet써야 할듯?)
  return (
    <>
      <div>MyPage</div>
      <Link to="/my-page/modify-userinfo">회원정보 수정</Link>
    </>
  );
};

export default MyPage;
