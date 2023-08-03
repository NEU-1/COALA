import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../pages/Layout';

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

// 제공자 페이지
import SellListBoard from '../components/SellBoard/SellListBoard';
import SellPostCreate from '../components/SellBoard/SellPostCreate';
import SellPostDetail from '../components/SellBoard/SellPostDetail';

// 테크게시판
import TechViewPage from '../components/Techboard/components/TechViewPage';
import TechBoardWrite from '../components/Techboard/components/TechBoardWrite';
import TechBoardList from '../components/Techboard/components/TechBoardList';

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/my-page" element={<MyPageContainer />}>
            <Route
              path="/my-page/modify-userinfo"
              element={<ModifyUserinfoContainer />}
            />
          </Route>
          <Route path="/tech/write" element={<TechBoardWrite />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/changepw" element={<ChangePw />} />
        <Route path="/sign-up/agreement" element={<AgreementContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />

        <Route path="/selllistboard" element={<SellListBoard />} />
        <Route path="/sellpostcreate" element={<SellPostCreate />} />
        <Route path="/sellpostdetail" element={<SellPostDetail />} />

        <Route path="/tech/:postId" element={<TechViewPage />} />
        <Route path="/tech" element={<TechBoardList />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
