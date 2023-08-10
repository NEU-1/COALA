import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';
import { images } from '../../../assets/images';

const ChatListItem = ({ item, onClickListItem }) => {
  let printDate;
  const itemDate = new Date(item.latestLog.latestLog.created_at);
  const today = new Date();

  itemDate.setHours(itemDate.getHours() - 9);
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  if (
    itemDate.getFullYear() === today.getFullYear() &&
    itemDate.getMonth() === today.getMonth() &&
    itemDate.getDate() === today.getDate()
  ) {
    printDate = itemDate.toLocaleTimeString('ko-KR', options);
  } else {
    printDate =
      itemDate.getFullYear() +
      '-' +
      String(itemDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(itemDate.getDate()).padStart(2, '0');
  }
  return (
    <SLayout
      onClick={() => {
        onClickListItem(item.name);
      }}
    >
      <SStart>
        <img
          src={`${images.chatModal.default_profile}`}
          className="profile"
          alt=""
        />
        <SPartnerInfo>
          <div className="partner">{item.name}</div>
          <div className="cur-chat">
            {item.latestLog.latestLog.text_content}
          </div>
        </SPartnerInfo>
      </SStart>
      <SEnd>
        <div className="time">{printDate}</div>
        {/* <div className="alarm">123</div> */}
      </SEnd>
    </SLayout>
  );
};

const SLayout = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

const SStart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .profile {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const SPartnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .partner {
    color: ${colors.deepPrimary};
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
  }

  .cur-chat {
    color: #959595;
    font-size: 9px;
    font-weight: 400;
    line-height: normal;
    text-align: left;
  }
`;

const SEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: flex-start;
  height: 100%;

  .time {
    color: #959595;
    font-size: 9px;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
  }

  .alarm {
    background-color: ${colors.middlePrimary};
    min-width: 15px;
    height: 15px;
    border-radius: 40px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    padding: 4px;
  }
`;

export default ChatListItem;
