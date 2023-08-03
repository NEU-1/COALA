import React from 'react';
import { styled } from 'styled-components';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import { Link } from 'react-router-dom';

const ChatBoardPreview = () => {
  return (
    <SLayout>
      <SStart
        onClick={() => {
          // 외부 페이지 이동
          window.top.location.href = '/board';
        }}
      >
        <img
          src={`${images.chatModal.default_profile}`}
          alt=""
          className="photo"
        />
        <SDescription>
          <div>한성 무접점 키보드 대여합니다!-!</div>
          <div>5,000원 / 20,000원</div>
        </SDescription>
      </SStart>
      {/* 제공자와 이용자에 따라 활성화 / 비활성화 + 거래하기 / 수락하기 */}
      <STradeBtn>거래하기</STradeBtn>
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
