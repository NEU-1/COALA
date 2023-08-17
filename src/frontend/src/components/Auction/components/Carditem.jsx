import * as React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRoom } from "../../../api/nodeServer/Room";
import { openChatModal } from "../../../store/chatModalSlice";
import { images } from "../../../assets/images";

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
        <SButton onClick={() => handlePictureChange("previous")}>
          <SBtnImg src={images.left} alt="" />
        </SButton>
        <SImg src={img[currentImgIndex].url} alt="" />
        <SButton onClick={() => handlePictureChange("next")}>
          <SBtnImg src={images.right} alt="" />
        </SButton>
      </SImgDiv>
      <STitleDiv>
        <STitleP>{title}</STitleP>
      </STitleDiv>
      <SMainTextDiv>
        <SMainTextP>{mainText}</SMainTextP>
      </SMainTextDiv>
      <SProductDetail>
        <SCostDiv>
          <STextP>대여료 / 보증금</STextP>
          <STextP>
            {rentalFee} / {deposit}
          </STextP>
        </SCostDiv>
        <SOfferP offer={bargaining}>
          {bargaining ? "가격 제안 가능" : "가격 제안 불가"}
        </SOfferP>
        <SCostButton onClick={goChat}>
          <SChateImg src={images.message} alt="" />
        </SCostButton>
      </SProductDetail>
    </SCard>
  );
}

const SCard = styled.div`
  display: flex;
  width: 550px;
  // height: 530px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #f5f5f5;
  overflow: auto;
`;

const SImgDiv = styled.div`
  display: flex;
  padding: 25px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  align-self: stretch;
`;

const SButton = styled.button`
  // padding: 120px 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 20px;
`;

const SImg = styled.img`
  display: flex;
  height: 250px;
  // width: 460px;
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
  padding: 0px 35px;
  align-items: center;
  margin-bottom: 20px;
`;

const STitleP = styled.p`
  color: #313737;
  font-size: 24px;
  font-weight: 700;
`;

const SMainTextDiv = styled.div`
  display: flex;
  width: 480px;
  height: 160px;
  max-height: 160px;
  overflow-y: auto;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  margin-left: 35px;
  margin-bottom: 20px;
`;

const SMainTextP = styled.p`
  color: #1a1c3d;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const SProductDetail = styled.div`
  display: flex;
  height: 76px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  margin-bottom: 20px;
`;

const SCostDiv = styled.div`
  display: flex;
  width: 180px;
  padding: 0px 35px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 13px;
`;

const STextP = styled.p`
  color: #1a1c3d;
  font-size: 16px;
  font-weight: 700;
`;

const SOfferP = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 400;
  background-color: ${(props) => (props.offer ? "green" : "red")};
  padding: 10px 15px;
  border-radius: 5px;
`;

const SCostButton = styled.div`
  display: flex;
  width: 140px;
  padding: 0px 35px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 13px;
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 20px;
`;

const SChateImg = styled.img`
  width: 80px;
`;

const SBtnImg = styled.img`
height: 50px;
`