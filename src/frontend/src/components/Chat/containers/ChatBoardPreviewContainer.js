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
    if (inform.room.pp_id) {
      setToken();
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
    }
  }, []);

  const onClickPost = () => {
    window.parent.postMessage(
      { msg: 'movePage', id: post.id },
      'http://localhost:3000'
    );
  };

  const onClickContractBtn = () => {
    window.parent.postMessage(
      {
        msg: 'openContract',
        post: post,
        producer: producer,
        consumer: consumer,
        myId: myId,
      },
      'http://localhost:3000'
    );
  };

  return (
    post && (
      <ChatBoardPreview
        post={post}
        producer={producer}
        consumer={consumer}
        myId={myId}
        onClickPost={onClickPost}
        onClickContractBtn={onClickContractBtn}
      />
    )
  );
};

export default ChatBoardPreviewContainer;
