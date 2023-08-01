import React from 'react';
import { css, keyframes, styled } from 'styled-components';
import { images } from '../../assets/images';
import { colors } from '../../assets/colors';
import ChatListContainer from './containers/ChatListContainer';

const ChatOpen = ({ isChatOpen, onClickChatBtn }) => {
  return (
    <>
      <SLayout isChatOpen={isChatOpen} onClick={onClickChatBtn}>
        <img src={`${images.message}`} alt="" />
      </SLayout>
      <SModalLayout isChatOpen={isChatOpen}>
        <ChatListContainer onClickChatBtn={onClickChatBtn} />
      </SModalLayout>
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
        transform: translateY(10%);
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
        transform: translateY(10%);
    }
`;

const BtnAnime = (visible) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

const ModalAnime = (visible) => css`
  visibility: ${visible ? 'hidden' : 'visible'};
  z-index: 15;
  animation: ${visible ? modalFadeOut : modalFadeIn} 0.3s ease-out;
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

const SModalLayout = styled.div`
  ${(props) => ModalAnime(props.isChatOpen)}
  position:fixed;
  right: 30px;
  bottom: 30px;
`;

export default ChatOpen;
