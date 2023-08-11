import React from 'react';
import ChatBoardPreview from '../components/ChatBoardPreview';
import { requestGet, setToken } from '../../../lib/api/api';
import { useState } from 'react';

const ChatBoardPreviewContainer = ({ productId, myId }) => {
  console.log(productId);
  const [producer_id, setProducer_id] = useState(null);
  const [consumer_id, setConsumer_id] = useState(null);
  // 제공자 or 이용자 게시글 정보를 얻어와서 props로 전달
  if (productId.pp_id) {
    setToken();
    requestGet(`detail?id=${productId.pp_id}`).then((res) => {
      if (res.data.baseResponseDto.statusCode === 200) {
        if (res.data.memberId === myId) {
          setProducer_id(myId);
          setConsumer_id(); // 상대방 ID
        } else {
          setProducer_id(res.data.memberId);
          setConsumer_id(myId);
        }
      }
    });
  }
  return <ChatBoardPreview />;
};

export default ChatBoardPreviewContainer;
