import * as React from "react";
import styled from "styled-components";

export default function ImgMediaCard({
  img,
  writer,
  writeDay,
  rentalFee,
  deposit,
  bargaining,
  onClick,
}) {
  return (
    <SCard onClick={onClick}>
      <SMaing>

      <SMainImg src={img} alt="" />
      </SMaing>
      <SWriterAndDay>
        <SWriter>
          <SWriterImg src="" alt="" />
          <SWriterName>{writer}</SWriterName>
        </SWriter>
        <SDay>{writeDay}</SDay>
      </SWriterAndDay>
      <SRentalFeeAndDeposit>
        <SRentalFee>{rentalFee}</SRentalFee>
        <SDeposit>{deposit}</SDeposit>
      </SRentalFeeAndDeposit>
      <SBarganingAndChatting>
      <SBarganing isBargainable={bargaining}>
          {bargaining ? "흥정 가능" : "흥정 불가능"}
        </SBarganing>        
        <SChatting>채팅</SChatting>
      </SBarganingAndChatting>
    </SCard>
  );
}

const SCard = styled.div`
display: flex;
width: 360px;
height: 509px;
flex-direction: column;
// justify-content: space-between;
align-items: center;
border-radius: 20px;
background: var(--primary, #E9D5FF);
`;

const SMaing = styled.div`
display: flex;
padding: 25px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`

const SMainImg = styled.img`
width: 310px;
height: 269px;
flex-shrink: 0;
border-radius: 10px 10px 0px 0px;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`

const SWriterAndDay = styled.div`
display: flex;
height: 61px;
padding: 0px 30px;
justify-content: space-between;
align-items: center;
flex-shrink: 0;
align-self: stretch;
`

const SWriter = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`

const SWriterImg = styled.img`
width: 49px;
height: 48px;
border-radius: 49px;
background: url(<path-to-image>), lightgray 0px -0.969px / 100% 142.969% no-repeat;
`

const SWriterName = styled.p`
color: var(--white, #FFF);
font-size: 16px;
font-weight: 700;
`

const SDay = styled.p`
color: var(--white, #FFF);
font-size: 20px;
font-weight: 300;
`

const SRentalFeeAndDeposit = styled.div`
display: flex;
padding: 10px 30px;
justify-content: space-between;
align-items: center;
align-self: stretch;
`

const SRentalFee = styled.p`
color: #FFF;
font-size: 20px;
font-weight: 700;
`

const SDeposit = styled.p`
color: #FFF;
font-size: 20px;
font-weight: 500;
`

const SBarganingAndChatting = styled.div`
display: flex;
height: 76.251px;
padding: 0px 30px;
justify-content: space-between;
align-items: center;
flex-shrink: 0;
align-self: stretch;
`

const SBarganing = styled.p`
color: ${({ isBargainable }) => (isBargainable ? "#FFF" : "red")};
font-size: 20px;
font-weight: 400;
line-height: 23px;
letter-spacing: 0.5px;
`

const SChatting = styled.div`
width: 51.077px;
height: 51.001px;
`