import React from 'react';
import ChatBoardPreview from '../components/ChatBoardPreview';
import { requestGet, setToken } from '../../../lib/api/api';
import { useState } from 'react';
import { useEffect } from 'react';

const ChatBoardPreviewContainer = ({ myId, inform }) => {
  console.log('dd');
  const [producer, setProducer] = useState(null);
  const [consumer, setConsumer] = useState(null);
  const [post, setPost] = useState(null);
  // 제공자 or 이용자 게시글 정보를 얻어와서 props로 전달
  useEffect(() => {
    setToken();
    if (inform.room.pp_id) {
      requestGet(`store/detail?id=${inform.room.pp_id}`).then((res) => {
        if (res.data.baseResponseDto.statusCode === 200) {
          setPost(res.data.storePost);
          if (res.data.memberId === myId) {
            setProducer(inform.user);
            setConsumer(inform.other); // 상대방 ID
          } else {
            setProducer(inform.other);
            setConsumer(inform.user);
          }
        }
      });
    } else if (inform.room.pr_id) {
      requestGet(`auction/detail?id=${inform.room.pr_id}`).then((res) => {
        if (res.data.baseResponseDto.statusCode === 200) {
          setPost(res.data.auctionPost);
          if (res.data.mine) {
            setProducer(inform.other);
            setConsumer(inform.user);
          } else {
            setProducer(inform.user);
            setConsumer(inform.other);
          }
        }
      });
    }
  }, []);

  const onClickPost = () => {
    if (inform.room.pp_id) {
      window.parent.postMessage(
        { msg: 'moveStorePage', id: post.id },
        'http://localhost:3000'
      );
    } else if (inform.room.pr_id) {
      window.parent.postMessage(
        { msg: 'moveAuctionPage', id: post.id },
        'http://localhost:3000'
      );
    }
  };

  return (
    post && (
      <ChatBoardPreview
        post={post}
        producer={producer}
        consumer={consumer}
        myId={myId}
        onClickPost={onClickPost}
      />
    )
  );
};

export default ChatBoardPreviewContainer;
