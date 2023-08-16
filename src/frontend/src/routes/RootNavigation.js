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
import StoreAndAuctionContainer from '../components/MyPage/containers/StoreAndAuctionContainer';
import TradeHistoryContainer from '../components/MyPage/containers/TradeHistoryContainer';

// 채팅
import ChatListContainer from '../components/Chat/containers/ChatListContainer';
import ChatRoomContainer from '../components/Chat/containers/ChatRoomContainer';
import ChatContainer from '../components/Chat/containers/ChatContainer';

import NotFound from '../pages/NotFound';
// 제공자 페이지
import Store from '../components/Store/Store';
import StoreWrite from '../components/Store/StoreWrite';
import StoreDetail from '../components/Store/StoreDetail';
import StoreUpdate from '../components/Store/StoreUpdate';

// 이용자 페이지
import Auction from '../components/Auction/Auction';
import AuctionWrite from '../components/Auction/AuctionWrite';
import AuctionDetail from '../components/Auction/AuctionDetail';
import AuctionUpdate from '../components/Auction/AuctionUpdate';

// 테크게시판
import TechBoardDetail from '../components/Techboard/components/TechBoardDetail';
import TechBoardWrite from '../components/Techboard/components/TechBoardWrite';
import TechBoardList from '../components/Techboard/components/TechBoardList';
import Commentapp from '../components/Techboard/components/Commentapp';
import TechBoardUpdate from '../components/Techboard/components/TechBoardUpdate';

//자유게시판
import FreeBoardDetail from '../components/Freeboard/components/FreeBoardDetail';
import FreeBoardWrite from '../components/Freeboard/components/FreeBoardWrite';
import FreeBoardList from '../components/Freeboard/components/FreeBoardList';
import FreeBoardUpdate from '../components/Freeboard/components/FreeBoardUpdate';
import FreeCommentForm from '../components/Freeboard/components/FreeCommentForm';
import FreeCommentList from '../components/Freeboard/components/FreeCommentList';

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
            <Route
              path="/my-page/store-and-auction"
              element={<StoreAndAuctionContainer />}
            />
            <Route
              path="/my-page/trade-history"
              element={<TradeHistoryContainer />}
            />
          </Route>
          <Route path="/tech/write" element={<TechBoardWrite />} />
          <Route path="/tech" element={<TechBoardList />} />
          <Route
            path="/tech/post/detail/:postid"
            element={<TechBoardDetail />}
          />
          <Route path="/tech/comment" element={<Commentapp />} />
          <Route path="/tech/update/:postid" element={<TechBoardUpdate />} />
          <Route path="/free/update/:postid" element={<FreeBoardUpdate />} />
          <Route
            path="/free/post/detail/:postid"
            element={<FreeBoardDetail />}
          />
          <Route path="/free/write" element={<FreeBoardWrite />} />
          <Route path="/free" element={<FreeBoardList />} />
          <Route path="/free/comment/:postid" element={<FreeCommentList />} />

          <Route path="/store" element={<Store />} />
          <Route path="/store/write" element={<StoreWrite />} />
          <Route path="/store/:postId" element={<StoreDetail />} />
          <Route path="/store/:postId/update" element={<StoreUpdate />} />

          <Route path="/auction" element={<Auction />} />
          <Route path="/auction/write" element={<AuctionWrite />} />
          <Route path="/auction/:postId" element={<AuctionDetail />} />
          <Route path="/auction/:postId/update" element={<AuctionUpdate />} />
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

        <Route path="/store" element={<Store />} />
        <Route path="/store/write" element={<StoreWrite />} />
        <Route path="/store/:postId" element={<StoreDetail />} />
        <Route path="/store/:postId/update" element={<StoreUpdate />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
