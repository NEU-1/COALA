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
  const [imgURL, setImgURL] = useState(null);

  // 제공자 or 이용자 게시글 정보를 얻어와서 props로 전달
  useEffect(() => {
    setToken();
    if (inform.room.pp_id) {
      requestGet(`store/detail?id=${inform.room.pp_id}`).then((res) => {
        if (res.data.baseResponseDto.statusCode === 200) {
          setPost(res.data.storePost);
          setImgURL(res.data.storeImageList[0]);
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
      requestGet(`auction/detail?id=${inform.room.pr_id}`)
        .then((res) => {
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
        })
        .catch((err) => {
          setPost(null);
        });
    }
  }, []);

  const onClickPost = () => {
    if (inform.room.pp_id) {
      window.parent.postMessage({ msg: 'moveStorePage', id: post.id }, '*');
    } else if (inform.room.pr_id) {
      window.parent.postMessage({ msg: 'moveAuctionPage', id: post.id }, '*');
    }
  };

  const onClickContractBtn = () => {
    window.parent.postMessage('closeChatModal', '*');
    window.parent.postMessage(
      {
        msg: 'openContract',
        post: post,
        producer: producer,
        consumer: consumer,
        myId: myId,
        chatRoomId: inform.room.id,
        contractId: null,
      },
      '*'
    );
  };

  const onClickAcceptBtn = () => {
    window.parent.postMessage('closeChatModal', '*');
    window.parent.postMessage(
      {
        msg: 'openContract',
        post: post,
        producer: producer,
        consumer: consumer,
        myId: myId,
        chatRoomId: inform.room.id,
        contractId: inform.room.contract_id,
      },
      '*'
    );
  };

  return (
    post && (
      <ChatBoardPreview
        post={post}
        imgURL={imgURL}
        producer={producer}
        consumer={consumer}
        inform={inform}
        myId={myId}
        onClickPost={onClickPost}
        onClickContractBtn={onClickContractBtn}
        onClickAcceptBtn={onClickAcceptBtn}
      />
    )
  );
};

export default ChatBoardPreviewContainer;
