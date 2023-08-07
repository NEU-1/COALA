import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';
import { images } from '../../../assets/images';

const ChatBubble = ({ message, memberId }) => {
  const dateObject = new Date(message.created_at);
  dateObject.setHours(dateObject.getHours() - 9);
  // 옵션 설정
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  // 원하는 형식으로 시간 변환
  const formattedTime = dateObject.toLocaleTimeString('ko-KR', options);
  console.log(memberId, message.member_id);

  return memberId === message.member_id ? (
    <SMyBubble>
      <SSendTime>{formattedTime}</SSendTime>
      <SMyBubbleContent>{message.text_content}</SMyBubbleContent>
    </SMyBubble>
  ) : (
    <SOtherBubble>
      <img
        src={`${images.chatModal.default_profile}`}
        alt="profile"
        className="profile"
      />
      <SOtherBubbleContent>{message.text_content}</SOtherBubbleContent>
      <SSendTime>{formattedTime}</SSendTime>
    </SOtherBubble>
  );
};

const SMyBubble = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
  margin: 10px 0px;
  gap: 6px;
`;

const SMyBubbleContent = styled.div`
  max-width: 200px;
  padding: 10px;
  background-color: ${colors.middlePrimary};
  border-radius: 10px 10px 0px 10px;
  color: white;
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  word-break: break-all;
`;

const SOtherBubble = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-start;
  margin: 10px 0px;
  gap: 6px;

  .profile {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;

const SOtherBubbleContent = styled.div`
  max-width: 200px;
  padding: 10px;
  background-color: ${colors.primary};
  border-radius: 10px 10px 10px 0px;
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  word-break: break-all;
`;

const SSendTime = styled.div`
  color: #bababa;
  font-size: 9px;
  font-weight: 400;
`;

export default ChatBubble;
