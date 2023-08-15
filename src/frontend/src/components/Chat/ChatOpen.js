import React from 'react';
import { css, keyframes, styled } from 'styled-components';
import { images } from '../../assets/images';
import { colors } from '../../assets/colors';

const ChatOpen = ({ isChatOpen, onClickChatBtn }) => {
  return (
    <>
      <SLayout isChatOpen={isChatOpen} onClick={onClickChatBtn}>
        <img src={`${images.message}`} alt="" />
      </SLayout>
      {isChatOpen && (
        <SModalLayout
          key={'chatModal'}
          id="chatModal"
          isChatOpen={isChatOpen}
          src="/chat/chat-list"
        />
      )}
    </>
  );
};

// animations
const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const modalFadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const modalFadeOut = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(100%);
    }
`;

const BtnAnime = (visible) => css`
  visibility: ${visible ? 'hidden' : 'visible'};
  z-index: 15;
  animation: ${visible ? fadeOut : fadeIn} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

const ModalAnime = (visible) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  z-index: 15;
  animation: ${visible ? modalFadeIn : modalFadeOut} 0.3s ease-out;
  transition: visibility 0.3s ease-out;
`;

const SLayout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: ${colors.primary};
  border-radius: 50%;
  position: fixed;
  right: 30px;
  bottom: 30px;
  ${(props) => BtnAnime(props.isChatOpen)}

  img {
    width: 60px;
    height: 60px;
  }
`;

const SModalLayout = styled.iframe`
  ${(props) => ModalAnime(props.isChatOpen)}
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 600px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 999;
`;

export default ChatOpen;
