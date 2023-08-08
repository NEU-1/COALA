import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import { images } from '../../assets/images';
import ChatBoardPreviewContainer from './containers/ChatBoardPreviewContainer';
import ChatBubble from './components/ChatBubble';

const ChatRoom = ({
  inputRef,
  message,
  onClickBackBtn,
  onChangeMessage,
  onSubmitMessage,
  allMessages,
  memberId,
  scrollRef,
  productId,
  onClickExitBtn,
}) => {
  console.log('로그 계속 나오는지 채크');
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
        <SExitBtn onClick={onClickExitBtn}>나가기</SExitBtn>
      </SChatHeader>

      {/* 게시글이 있는 경우에만 랜더링 */}
      {(productId.pr_id || productId.pp_id) && (
        <ChatBoardPreviewContainer productId={productId} />
      )}

      <SChatBubbleList>
        {/* key는 메세지 id로 */}
        {allMessages &&
          allMessages.map((message, index) => {
            let displayDate = false;
            let today = '';

            const isCreated = new Date(message.created_at);
            isCreated.setHours(isCreated.getHours() - 9);

            if (index !== allMessages.length - 1) {
              const nextCreated = new Date(allMessages[index + 1].created_at);
              nextCreated.setHours(nextCreated.getHours() - 9);

              if (isCreated.getDate() !== nextCreated.getDate()) {
                displayDate = true;

                let day = '';
                switch (nextCreated.getDay()) {
                  case 0:
                    day = '일';
                    break;
                  case 1:
                    day = '월';
                    break;
                  case 2:
                    day = '화';
                    break;
                  case 3:
                    day = '수';
                    break;
                  case 4:
                    day = '목';
                    break;
                  case 5:
                    day = '금';
                    break;
                  case 6:
                    day = '토';
                    break;
                  default:
                    break;
                }
                today = `${nextCreated.getFullYear()}년 ${
                  nextCreated.getMonth() + 1
                }월 ${nextCreated.getDate()}일 ${day}요일`;
              }
            }
            return (
              <ChatBubble
                key={message._id}
                message={message}
                memberId={memberId}
                displayDate={displayDate}
                today={today}
              />
            );
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
          ref={inputRef}
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
