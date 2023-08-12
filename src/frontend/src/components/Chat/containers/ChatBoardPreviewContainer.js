import React from 'react';
import ChatBoardPreview from '../components/ChatBoardPreview';
import { requestGet, setToken } from '../../../lib/api/api';
import { useState } from 'react';
import { useEffect } from 'react';

const ChatBoardPreviewContainer = ({ myId, inform }) => {
  console.log('dd');
  const [producer_id, setProducer_id] = useState(null);
  const [consumer_id, setConsumer_id] = useState(null);
  const [post, setPost] = useState(null);
  // 제공자 or 이용자 게시글 정보를 얻어와서 props로 전달
  useEffect(() => {
    if (inform.room.pp_id) {
      setToken();
      requestGet(`store/detail?id=${inform.room.pp_id}`).then((res) => {
        if (res.data.baseResponseDto.statusCode === 200) {
          setPost(res.data.storePost);
          if (res.data.memberId === myId) {
            setProducer_id(myId);
            setConsumer_id(inform.other.id); // 상대방 ID
          } else {
            setProducer_id(inform.other.id);
            setConsumer_id(myId);
          }
        }
      });
    }
  }, []);

  return (
    post && (
      <ChatBoardPreview
        post={post}
        producer_id={producer_id}
        consumer_id={consumer_id}
        myId={myId}
      />
    )
  );
};

export default ChatBoardPreviewContainer;
