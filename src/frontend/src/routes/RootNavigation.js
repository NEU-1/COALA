import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";

// 로그인
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";

// 비밀번호 변경
import FindPw from "../components/Login/FindPw";
import ChangePw from "../components/Login/ChangePw";

// 회원가입
import SignUpContainer from "../components/SignUp/containers/SignUpContainer";
import AgreementContainer from "../components/SignUp/containers/AgreementContainer";

// 마이페이지
import MyPageContainer from "../components/MyPage/containers/MyPageContainer";
import ModifyUserinfoContainer from "../components/MyPage/containers/ModifyUserinfoContainer";

// 제공자 페이지
import Store from "../components/SellBoard/Store";
import StoreDetail from "../components/SellBoard/StoreDetail";
import StoreWrite from "../components/SellBoard/StoreWrite";

// 테크게시판
import TechBoardDetail from "../components/Techboard/components/TechBoardDetail";
import TechBoardWrite from "../components/Techboard/components/TechBoardWrite";
import TechBoardList from "../components/Techboard/components/TechBoardList";
import Commentapp from "../components/Techboard/components/Commentapp";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/my-page" element={<MyPageContainer />}>
            <Route path="/my-page/modify-userinfo" element={<ModifyUserinfoContainer />} />
          </Route>
          <Route path="/tech/write" element={<TechBoardWrite />} />
          <Route path="/tech" element={<TechBoardList />} />
          <Route path="/tech/post/detail/:postid" element={<TechBoardDetail />} />
          <Route path="/tech/comment" element={<Commentapp />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/changepw" element={<ChangePw />} />
        <Route path="/sign-up/agreement" element={<AgreementContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />

        <Route path="/store" element={<Store />} />
        <Route path="/store/write" element={<StoreWrite />} />
        <Route path="/store/:postId" element={<StoreDetail />} />

      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
