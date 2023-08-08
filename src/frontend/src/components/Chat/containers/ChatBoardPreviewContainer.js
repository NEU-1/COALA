import React from 'react';
import ChatBoardPreview from '../components/ChatBoardPreview';
import { requestGet } from '../../../lib/api/api';

const ChatBoardPreviewContainer = ({ productId }) => {
  console.log(productId);
  // 제공자 or 이용자 게시글 정보를 얻어와서 props로 전달
  return <ChatBoardPreview />;
};

export default ChatBoardPreviewContainer;
