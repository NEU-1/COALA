import React, { useEffect, useRef, useState } from "react";
import { images } from "../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../store/LoginSlice";
import {
  requestDel,
  requestPost,
  requestGet,
  setToken,
} from "../../lib/api/api";
import { fetchRoom } from "../../api/nodeServer/Room";
import { useDispatch } from "react-redux";
import {openChatModal} from '../../store/chatModalSlice'

const StoreDetail = () => {
  const [postData, setPostData] = useState(null);
  const { postId } = useParams();

  setToken();
  useEffect(() => {
    requestGet(`store/detail?id=${postId}`)
      .then((res) => {
        setPostData(res.data);
        setLike(res.data.like);
        setIsAuthor(res.data.mine);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(postData);

  const [pictures, setPictures] = useState([]);
  const [pictureNum, setPictureNum] = useState(0);
  const [like, setLike] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (postData) {
      setLike(postData.like);
      setIsAuthor(postData.mine);
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = login;

  const [showModal, setShowModal] = useState(false);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const displayDate = postData
    ? formattedDate(postData.storePost.createdAt)
    : "";

  const handlePictureChange = (direction) => {
    const totalPictures = pictures.length;
    if (direction === "next") {
      setPictureNum((pictureNum + 1) % totalPictures);
    } else {
      setPictureNum((pictureNum - 1 + totalPictures) % totalPictures);
    }
  };

  const toggleLike = () => {
    setLike((prevLike) => !prevLike);

    setToken();
    requestPost(`store/like?id=${postId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        console.log("자기가 쓴 글은 추천 못함");
      });
  };

  const showDeleteModal = () => {
    setShowModal(true);
  };
  const handleDelete = async () => {
    setToken();
    requestDel(`store/delete?id=${postId}`)
      .then((res) => {
        console.log(res);
        console.log("삭제됨");
        navigate("/store");
      })
      .catch((err) => {
        console.error(err);
        console.log("본인 글만 삭제 가능");
      });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const goProfile = () => {
    navigate("/profile");
  };

  const generateRoomId = () => {
    let text = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i = 0;i < 5;i++) {
      text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return text;
  }

  const goChat = () => {
    if (isLogin) {
      const name = generateRoomId();
      fetchRoom.create({roomName: name, pp_id: postData.storePost.id, ur_id: postData.memberId})
      .then((res)=> {
        dispatch(openChatModal());
        setTimeout(()=>{
          const chatModal = document.getElementById("chatModal");
          // chatModal.src=`/chat/${res.data}`; // roomID 받아오기
          chatModal.src='/chat/테스트룸1';
        }, 100)
      })
    } else {
      alert("로그인하세요");
      navigate("/login");
    }
  };
  const goUpdate = () => {
    requestGet(`store/valid?id=${postId}`)
      .then((res) => {
        if (res.status === 200) {
          navigate(`update`);
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("본인글만 수정 가능");
      });
  };
  const handleBackdropClick = (event) => {
    setShowModal(false);
  };
  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  return postData ? (
    <SMain>
      <SImgs>
        <button onClick={handlePictureChange}>{"<"}</button>
        {pictures.length > 0 && <SImg src={pictures[pictureNum]} alt="" />}
        <button onClick={handlePictureChange}>{">"}</button>
      </SImgs>
      <SHeader>
        <SProfile onClick={goProfile}>
          <SProfileImg src={images.plus} alt="" />
          <SText>{postData.storePost.author}</SText>
        </SProfile>
        <SDayAndCost>
          <SText>
            최소 {postData.storePost.minRentalPeriod}일 / 최대{" "}
            {postData.storePost.maxRentalPeriod}일
          </SText>
          <SText>
            {postData.storePost.rentalCost}원 / {postData.storePost.deposit}원
          </SText>
        </SDayAndCost>
      </SHeader>
      <SContent>
        <STitleAndProduct>
          <SText>{postData.storePost.title}</SText>
          <STextSub>
            {postData.storePost.category.name} / {displayDate}
          </STextSub>
        </STitleAndProduct>
        {!isAuthor &&
          (like ? (
            <img src={images.like} alt="React" onClick={toggleLike} />
          ) : (
            <img src={images.notlike} alt="React" onClick={toggleLike} />
          ))}
      </SContent>
      <SContentDetail>
        <STextContent>{postData.storePost.detail}</STextContent>
      </SContentDetail>
      <SFooter>
        <STextSubSee>
          조회수 {postData.storePost.views} 관심 {postData.likes}
        </STextSubSee>
      </SFooter>
      {isAuthor ? (
        <SButtons>
          <SButtonWeekPurple onClick={showDeleteModal}>삭제</SButtonWeekPurple>
          <SButtonPurple onClick={goUpdate}>수정</SButtonPurple>
        </SButtons>
      ) : (
        <SButtons>
          <SButtonWeekPurple onClick={goChat}>거래 요청</SButtonWeekPurple>
        </SButtons>
      )}
      {showModal && (
        <>
          <SModalBackdrop onClick={handleBackdropClick}>
            <SModal onClick={handleModalContentClick}>
              <STextContent>삭제</STextContent>
              <STextDelete>정말 삭제하시겠습니까?</STextDelete>
              <SButtonsDelete>
                <SButtonDelete onClick={handleDelete}>삭제</SButtonDelete>
                <SButtonBack onClick={handleCancel}>취소</SButtonBack>
              </SButtonsDelete>
            </SModal>
          </SModalBackdrop>
        </>
      )}
    </SMain>
  ) : null;
};

export default StoreDetail;

const SMain = styled.div`
  display: flex;
  // weight: 800px;
  height: 1024px;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  margin-top: 170px;
`;

const SImgs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SImg = styled.img`
  width: 800px;
  height: 372px;
`;

const SHeader = styled.div`
  display: flex;
  width: 800px;
  padding: 10px 20px;
  gap: 10px;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
  justify-content: space-between;
  align-items: center;
`;

const SProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SProfileImg = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 84px;
`;

const SDayAndCost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;

const SText = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const SContent = styled.div`
  display: flex;
  width: 800px;
  padding: 20px;
  // align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
  justify-content: space-between;
  align-items: center;
`;

const STitleAndProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const STextSub = styled.p`
  color: #a4a4a4;
  font-family: SF Pro Rounded;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SContentDetail = styled.div`
  display: flex;
  width: 800px;
  padding: 20px;
  align-items: center;
  gap: 10px;
`;

const STextContent = styled.p`
  color: #000;
  font-size: 20px;
  font-weight: 700;
`;

const SFooter = styled.div`
  display: flex;
  width: 800px;
  padding: 20px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
`;

const STextSubSee = styled.p`
  color: #a4a4a4;
  font-family: SF Pro Rounded;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SButtons = styled.div`
  display: flex;
  width: 800px;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const SButtonWeekPurple = styled.button`
  display: flex;
  width: 106px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: #e9d5ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.14px;
`;

const SButtonPurple = styled.button`
  display: flex;
  width: 106px;
  height: 40px;
  padding: 10px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: #bd84fc;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.14px;
`;

const SModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 400px;
  height: 150px;
  padding: 30px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--confirm-border, #e9d5ff);
  background: var(--white, #fff);
  z-index: 10;
`;

const SModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const STextDelete = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 400;
`;

const SButtonsDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SButtonDelete = styled.button`
  display: flex;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--primary, #e9d5ff);
  color: var(--white, #fff);
  font-size: 12px;
  font-weight: 700;
`;

const SButtonBack = styled.button`
  display: flex;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--cancel, #d9d9d9);
  color: var(--white, #fff);
  font-size: 12px;
  font-weight: 700;
`;
