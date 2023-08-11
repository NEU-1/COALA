import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ImgMediaCard({
  img,
  title,
  mainText,
  rentalFee,
  deposit,
  bargaining,
}) {
  // const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  // const handlePictureChange = (direction) => {
  //   const totalPictures = img.length;
  //   if (direction === "next") {
  //     setCurrentImgIndex((currentImgIndex + 1) % totalPictures);
  //   } else {
  //     setCurrentImgIndex((currentImgIndex - 1 + totalPictures) % totalPictures);
  //   }
  // };
  const navigate = useNavigate();
  const goChat = () => {
    navigate("/chat");
  };
  return (
    <SCard>
      {/* <SImgDiv>
        <SImg src={img} alt="" />
        <button onClick={() => handlePictureChange("previous")}>{"<"}</button>
        <SImg src={img[currentImgIndex]} alt="" />
        <button onClick={() => handlePictureChange("next")}>{">"}</button>
      </SImgDiv> */}
      <STitleDiv>
        <STitleP>{title}</STitleP>
      </STitleDiv>
      <SMainTextDiv>
        <SMainTextP>
          {mainText}
        </SMainTextP>
      </SMainTextDiv>
      <SProduct>
        <SProductTitle>제품 상세 정보</SProductTitle>
      </SProduct>
      <SProductDetail>
        <SCostDiv>
          <STextP>가격</STextP>
          <STextP>
            {rentalFee}/{deposit}
          </STextP>
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

// const SImgDiv = styled.div`
//   display: flex;
//   padding: 25px;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 10px;
//   align-self: stretch;
// `;

// const SImg = styled.img`
//   display: flex;
//   height: 269px;
//   justify-content: flex-end;
//   align-items: flex-start;
//   gap: 10px;
//   align-self: stretch;
//   border-radius: 30px;
//   background: url(<path-to-image>), lightgray 50% / cover no-repeat;
// `;

const STitleDiv = styled.div`
  display: flex;
  width: 550px;
  padding: 0px 20px;
  align-items: center;
`;

const STitleP = styled.p`
  color: #313737;
  font-size: 16px;
  font-weight: 700;
`;

const SMainTextDiv = styled.div`
  display: flex;
  width: 510px;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  margin-left: 20px;
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
  padding: 0px 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
`;

const SProductTitle = styled.p`
  color: #1a1c3d;
  font-size: 14px;
  font-weight: 400;
`;

const SProductDetail = styled.div`
  display: flex;
  height: 49px;
  align-items: center;
  gap: 256px;
  flex-shrink: 0;
  align-self: stretch;
`;

const SCostDiv = styled.div`
  display: flex;
  width: 100px;
  padding: 0px 20px;
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
  color: ${(props) => (props.offer ? "white" : "#1A1C3D")};
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => (props.offer ? "green" : "red")};
  padding: 5px 10px;
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
