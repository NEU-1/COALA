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

// 채팅
import ChatListContainer from '../components/Chat/containers/ChatListContainer';
import ChatRoomContainer from '../components/Chat/containers/ChatRoomContainer';
import ChatContainer from '../components/Chat/containers/ChatContainer';

import NotFound from '../pages/NotFound';

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/my-page" element={<MyPageContainer />} />
          <Route
            path="/my-page/modify-userinfo"
            element={<ModifyUserinfoContainer />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/changepw" element={<ChangePw />} />
        <Route path="/sign-up/agreement" element={<AgreementContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />

        <Route path="/chat" element={<ChatContainer />}>
          <Route index path="/chat/chat-list" element={<ChatListContainer />} />
          <Route path="/chat/:roomName" element={<ChatRoomContainer />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
