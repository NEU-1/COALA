import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 로그인
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';

// 비밀번호 변경
import FindPw from '../components/Login/FindPw';
import ChangePw from '../components/Login/ChangePw';

// 회원가입
import SignUpContainer from '../components/SignUp/containers/SignUpContainer';
import AgreementContainer from '../components/SignUp/containers/AgreementContainer';

// 마이페이지
import MyPageContainer from '../components/MyPage/containers/MyPageContainer';
import ModifyUserinfoContainer from '../components/MyPage/containers/ModifyUserinfoContainer';

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/changepw" element={<ChangePw />} />
        <Route path="/agreement" element={<AgreementContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />

        <Route path="/my-page" element={<MyPageContainer />} />
        <Route
          path="/my-page/modify-userinfo"
          element={<ModifyUserinfoContainer />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
