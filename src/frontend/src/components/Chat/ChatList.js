import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import { images } from '../../assets/images';
import ChatListItem from './components/ChatListItem';

const ChatList = ({ onClickChatBtn, list, onClickListItem }) => {
  return (
    <SLayout>
      <SChatHeader>
        <SMyProfile>
          <img src={`${images.chatModal.default_profile}`} alt="" />
          <div>본인</div>
        </SMyProfile>
        <button onClick={onClickChatBtn}>
          <img
            src={`${images.chatModal.arrow_down}`}
            className="arrow-down"
            alt=""
          />
        </button>
      </SChatHeader>
      <SChatList>
        {list.map((item) => {
          return (
            <ChatListItem
              key={item.id}
              item={item}
              onClickListItem={onClickListItem}
            />
          );
        })}
      </SChatList>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 600px;
  background-color: ${colors.chat.background};
  border-radius: 10px;
`;

const SChatHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.primary};

  .arrow-down {
    width: 25px;
    height: 25px;
  }
`;

const SMyProfile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const SChatList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default ChatList;
