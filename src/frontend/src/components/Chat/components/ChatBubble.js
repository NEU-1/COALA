import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';
import { images } from '../../../assets/images';

const ChatBubble = ({ message }) => {
  return (
    <SOtherBubble>
      <img
        src={`${images.chatModal.default_profile}`}
        alt="profile"
        className="profile"
      />
      <SOtherBubbleContent>{message.message}</SOtherBubbleContent>
      <SSendTime>03:12 AM</SSendTime>
    </SOtherBubble>
    // <SMyBubble>
    //   <SSendTime>03:12 AM</SSendTime>
    //   <SMyBubbleContent>{message.message}</SMyBubbleContent>
    // </SMyBubble>
  );
};

// 메세지가 내껀지 남의 껀지에 따라 style 변경 필요
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
