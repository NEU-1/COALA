import React from 'react';
import { styled } from 'styled-components';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import { Link } from 'react-router-dom';

const ChatBoardPreview = ({
  post,
  producer,
  consumer,
  inform,
  myId,
  onClickPost,
  onClickContractBtn,
  onClickAcceptBtn,
}) => {
  console.log(post);
  return (
    <SLayout>
      <SStart
        onClick={() => {
          // 외부 페이지 이동
          onClickPost();
        }}
      >
        <img
          src={`${images.chatModal.default_profile}`}
          alt=""
          className="photo"
        />
        <SDescription>
          <div>{post.title}</div>
          {post.rentalCost && (
            <div>
              {post.rentalCost}원 / {post.deposit}원
            </div>
          )}
        </SDescription>
      </SStart>
      {/* 제공자와 이용자에 따라 활성화 / 비활성화 + 거래하기 / 수락하기 */}
      {myId === producer.id && post.status === 1 && (
        <STradeBtn onClick={onClickContractBtn}>거래하기</STradeBtn>
      )}
      {myId === consumer.id && post.status === 0 && inform.room.contract_id && (
        <STradeBtn onClick={onClickAcceptBtn}>수락하기</STradeBtn>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  width: 350px;
  background-color: ${colors.chat.background};
  border-bottom: 1px solid ${colors.primary};
  padding: 15px 10px;
  justify-content: space-between;
  align-items: center;
`;

const SStart = styled.div`
  display: flex;
  gap: 10px;

  .photo {
    width: 60px;
    height: 50px;
    border-radius: 5px;
  }
`;

const SDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    font-size: 12px;
    font-weight: 700;
  }
`;

const STradeBtn = styled.button`
  display: flex;
  width: 70px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${colors.middlePrimary};

  padding: 10px;
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

export default ChatBoardPreview;
