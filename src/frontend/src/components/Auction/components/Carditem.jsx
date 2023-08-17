import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRoom } from "../../../api/nodeServer/Room";
import { openChatModal } from "../../../store/chatModalSlice";

export default function ImgMediaCard({
  img,
  postId,
  proposerId,
  title,
  mainText,
  rentalFee,
  deposit,
  bargaining,
}) {
  console.log(img);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const handlePictureChange = (direction) => {
    const totalPictures = img.length;
    if (direction === "next") {
      setCurrentImgIndex((currentImgIndex + 1) % totalPictures);
    } else {
      setCurrentImgIndex((currentImgIndex - 1 + totalPictures) % totalPictures);
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateRoomId = () => {
    let text = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i = 0;i < 5;i++) {
      text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return text;
  }

  const goChat = () => {
    const name = generateRoomId();
      fetchRoom.create({roomName: name, pr_id: postId, ur_id: proposerId})
      .then((res)=> {
        dispatch(openChatModal());
        setTimeout(()=>{
          const chatModal = document.getElementById("chatModal");
          chatModal.src=`/chat/${res.data.result.name}`; // roomID 받아오기
        }, 100)
      })
  };
  return (
    <SCard>
      <SImgDiv>
        <SButton onClick={() => handlePictureChange("previous")}>{"<"}</SButton>
        <SImg src={img[currentImgIndex].url} alt="" />
        <SButton onClick={() => handlePictureChange("next")}>{">"}</SButton>
      </SImgDiv>
      <STitleDiv>
        <STitleP>{title}</STitleP>
      </STitleDiv>
      <SMainTextDiv>
        <SMainTextP>{mainText}</SMainTextP>
      </SMainTextDiv>
      <SProduct>
        <STitleP>제품 상세 정보</STitleP>
      </SProduct>
      <SProductDetail>
        <SCostDiv>
          <STextP>보증금</STextP>
          <STextP>{deposit}</STextP>
        </SCostDiv>
        <SCostDiv>
          <STextP>대여료</STextP>
          <STextP>{rentalFee}</STextP>
        </SCostDiv>
      </SProductDetail>
      <SFooterDiv>
        <SQuestionBtn>
          <SOfferP offer={bargaining}>
            {bargaining ? "가격 제안 가능" : "가격 제안 불가"}
          </SOfferP>
        </SQuestionBtn>

        <SChat onClick={goChat}>chat icon</SChat>
      </SFooterDiv>
    </SCard>
  );
}

const SCard = styled.div`
  display: flex;
  width: 550px;
  height: 700px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  background: #f5f5f5;
`;

const SImgDiv = styled.div`
  display: flex;
  padding: 25px;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: stretch;
`;

const SButton = styled.button`
  padding: 120px 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const SImg = styled.img`
  display: flex;
  height: 300px;
  width: 460px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 30px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  &[width="460"] {
    width: auto;
    height: auto;
  }

  &[height="300"] {
    width: auto;
    height: auto;
  }
`;

const STitleDiv = styled.div`
  display: flex;
  width: 550px;
  padding: 0px 30px;
  align-items: center;
`;

const STitleP = styled.p`
  color: #313737;
  font-size: 16px;
  font-weight: 700;
`;

const SMainTextDiv = styled.div`
  display: flex;
  width: 480px;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  margin-left: 35px;
`;

const SMainTextP = styled.p`
  color: #1a1c3d;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const SProduct = styled.div`
  display: flex;
  height: 12.978px;
  padding: 0px 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
`;

const SProductDetail = styled.div`
  display: flex;
  height: 49px;
  align-items: center;
  gap: 220px;
  flex-shrink: 0;
  align-self: stretch;
`;

const SCostDiv = styled.div`
  display: flex;
  width: 120px;
  padding: 0px 35px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 13px;
`;

const STextP = styled.p`
  color: #1a1c3d;
  font-size: 12px;
  font-weight: 400;
`;

const SOfferP = styled.p`
  color: white;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => (props.offer ? "green" : "red")};
  padding: 10px 15px;
  border-radius: 5px;
`;

const SFooterDiv = styled.div`
  display: flex;
  height: 76px;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
`;

const SQuestionBtn = styled.div`
  display: flex;
  width: 153px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const SChat = styled.div`
  width: 51.077px;
  height: 51.001px;
`;
