import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import { images } from '../../assets/images';
import ChatBoardPreviewContainer from './containers/ChatBoardPreviewContainer';
import ChatBubble from './components/ChatBubble';

const ChatRoom = ({
  message,
  onClickBackBtn,
  onChangeMessage,
  onSubmitMessage,
  allMessages,
  scrollRef,
}) => {
  return (
    <SLayout>
      <SChatHeader>
        <SStart>
          <img
            src={`${images.chatModal.arrow_back}`}
            alt=""
            className="arrowBack"
            onClick={onClickBackBtn}
          />
          <SOtherInfo>
            <img
              src={`${images.chatModal.default_profile}`}
              alt=""
              className="profile"
            />
            <div className="otherName">상대방</div>
          </SOtherInfo>
        </SStart>
        <SExitBtn>나가기</SExitBtn>
      </SChatHeader>

      {/* 게시글이 있는 경우에만 랜더링 */}
      <ChatBoardPreviewContainer />

      <SChatBubbleList>
        {/* key는 메세지 id로 */}
        {allMessages &&
          allMessages.map((message) => {
            return <ChatBubble key={message._id} message={message} />;
          })}
        <div ref={scrollRef}></div>
      </SChatBubbleList>

      {/* 메세지 입력란 */}
      <SInputMsgBox>
        <SAttachBtn>
          <img src={`${images.chatModal.attach}`} alt="첨부" />
        </SAttachBtn>
        <SInputMsg
          type="text"
          value={message}
          placeholder="내용을 입력하세요."
          onChange={onChangeMessage}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmitMessage();
            }
          }}
        />
        <SSendBtn onClick={onSubmitMessage}>
          <img src={`${images.chatModal.send}`} alt="전송" />
        </SSendBtn>
      </SInputMsgBox>
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
  padding: 15px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.primary};
`;

const SStart = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .arrowBack {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const SOtherInfo = styled.div`
  display: flex;
  align-items: center;
  .profile {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .otherName {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
  }
`;

const SExitBtn = styled.button`
  display: flex;
  width: 70px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${colors.deepPrimary};

  padding: 10px;
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

const SInputMsgBox = styled.div`
  width: 100%;
  padding: 15px 10px;
  background-color: ${colors.primary};
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0px;
  justify-content: space-between;
`;

const SAttachBtn = styled.button`
  display: flex;
  align-items: center;
`;

const SInputMsg = styled.input`
  display: flex;
  width: 250px;
  padding: 10px;
  align-items: center;
  border-radius: 15px;
`;

const SSendBtn = styled.button`
  display: flex;
`;

const SChatBubbleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.chat.background};
  border-radius: 10px;
  padding: 15px 10px;
  margin-bottom: 70px;
  overflow: auto;
  /* flex: 1; */
`;

export default ChatRoom;
