import React, { useState } from "react";
import { styled } from "styled-components";
import { images } from "../../../assets/images";
import CCheckBox from "../../Common/CCheckBox";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { requestPost, setToken } from "../../../lib/api/api";
import { useParams } from "react-router-dom";

const SERVER_URL = "--서버 주소--";

const TradeOfferForm = ({ onClose }) => {
  const [imageList, setImageList] = useState([]);
  const [bargain, setBargain] = useState(0);
  // const [calendarDay, setCalendarDay] = useState(new Date());
  // const [calendar, setCalendar] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mySell, setMySell] = useState([111111, 222222, 33333]);
  const { postId } = useParams();
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageList.length) % imageList.length
    );
  };

  const initialState = {
    title: "",
    mainText: "",
    deposit: "",
    rentalFee: "",
    day: "",
  };
  const [state, setState] = useState(initialState);
  const { title, mainText, deposit, rentalFee } = state;

  // const calendarHandler = () => {
  //   setCalendar(!calendar);
  // };
  // const year = calendarDay.getFullYear();
  // const month = calendarDay.getMonth() + 1;
  // const date = calendarDay.getDate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onUpload = async (e) => {
    const files = e.target.files;
    const newImages = await Promise.all(
      [...files].map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      })
    );
    setImageList((prev) => [...prev, ...newImages]);
  };

  const setBargainStatus = (e) => {
    setBargain(e.target.checked ? 1: 0);
  };
  const goServer = async () => {
    setToken();
    let formData = new FormData();
    formData.append('json', JSON.stringify({
      title : title,
      detail : mainText,
      deposit: deposit,
      rentalCost : rentalFee,
      negotiation : bargain
    }))
    let file = new Blob();
    formData.append('multipartFile', file);
    requestPost(`auction/apply?id=${postId}`, formData, {
      'Content-Type': 'multipart/form-data'
    })
    .then((res) => {
      console.log(res)
      // console.log(title, mainText, deposit, rentalFee, bargain)
    })
    .catch((err) => {
      console.error(err)
    })
    // try {
    //   const formData = new FormData();
    //   imageList.forEach((image, index) => {
    //     formData.append(`image${index}`);
    //   });
    //   formData.append("title", title);
    //   formData.append("mainText", mainText);
    //   formData.append("deposit", deposit);
    //   formData.append("rentalFee", rentalFee);
    //   formData.append("day", day);
    //   formData.append("bargain", bargain);
    //   const response = await axios.post("서버의 URL", formData);

    //   alert(response.status === 200 ? "성공" : "실패");
    // } catch (err) {
    //   console.error("통신 오류", err);
    // }
  };
  const fetchMySellData = (setMySell) => {
    axios
      .get(SERVER_URL)
      .then((response) => setMySell(response.data))
      .catch((error) => console.error("Error fetching my sell data:", error));
  };

  const handleCancel = () => {
    onClose && onClose();
  };
  const mySellHandler = () => {
    setShowDropdown(!showDropdown);
    fetchMySellData(setMySell);
  };

  return (
    <SCard>
      <div>
        <SImgDiv>
          {imageList.length > 0 && <SImg src={imageList[currentImageIndex]} />}

          <label>
            <input
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => onUpload(e)}
            />
            <SImgS src={images.plus} alt="Plus" />
          </label>
        </SImgDiv>
        <SLRBtn>
          <SLRBtns onClick={prevImage}>&lt;</SLRBtns>
          <SLRBtns onClick={nextImage}>&gt;</SLRBtns>
        </SLRBtn>
      </div>
      <STMTCPDiv>
        <STMTDiv>
          <STitleAndMainTextDiv>
            <SMainP>제목</SMainP>
            <STitleAndMainTextInput
              name="title"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={handleChange}
            />
          </STitleAndMainTextDiv>
          <STitleAndMainTextDiv>
            <SMainP>내용</SMainP>
            <STitleAndMainTextInput
              name="mainText"
              placeholder="내용을 입력하세요."
              value={mainText}
              onChange={handleChange}
            />
          </STitleAndMainTextDiv>
        </STMTDiv>
        <SMyProductListBtn onClick={mySellHandler}>
          내 제품
          {showDropdown && (
            <SDropdownMenu>
              {mySell.map((item, index) => (
                <SDropdownMenuItem key={index}>{item}</SDropdownMenuItem>
              ))}
            </SDropdownMenu>
          )}
        </SMyProductListBtn>
      </STMTCPDiv>
      <SProductDetailDiv>
        <SProductDetailP>제품 상세 정보</SProductDetailP>
      </SProductDetailDiv>
      <SCostAndDayDiv>
        <SCDDiv>
          <SMainP>가격</SMainP>
          <SDRFDiv>
            <SSubP>보증금</SSubP>
            <SCDInput
              name="deposit"
              placeholder="보증금을 입력하세요."
              value={deposit}
              onChange={handleChange}
            />
          </SDRFDiv>
          <SDRFDiv>
            <SSubP>대여료</SSubP>
            <SCDInput
              name="rentalFee"
              placeholder="대여료를 입력하세요."
              value={rentalFee}
              onChange={handleChange}
            />
          </SDRFDiv>
        </SCDDiv>
        <SDCDiv>
          <SMainP>기간</SMainP>
          {/* <SDayDiv>
            <SCalendarDate>
              <SSubP>상한 날짜</SSubP>
              <SSubP
                onClick={calendarHandler}
              >{`${year}년 ${month}월 ${date}일`}</SSubP>
            </SCalendarDate>
            {calendar ? (
              <Calendar onChange={setCalendarDay} value={calendarDay} />
            ) : (
              ""
            )}
          </SDayDiv> */}
          <CCheckBox
            name="bargain"
            text={"가격 제안 여부"}
            checked={bargain}
            onChange={setBargainStatus}
          />
        </SDCDiv>
      </SCostAndDayDiv>
      <SButtons>
        <SProposalBtn onClick={goServer}>제안</SProposalBtn>
        <SNoBtn onClick={handleCancel}>취소</SNoBtn>
      </SButtons>
    </SCard>
  );
};

export default TradeOfferForm;

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
  padding: 25px;
  display: inline-flex;
  align-items: center;
  gap: 15px;
`;

const STMTCPDiv = styled.div`
  display: flex;
  height: 57px;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  align-self: stretch;
`;

const STMTDiv = styled.div`
  display: flex;
  padding: 0px 25px;
  flex-direction: column;
  align-items: center;
  gap: 19px;
`;

const SMyProductListBtn = styled.button`
  display: flex;
  width: 106px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: var(--reserved, #bd84fc);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  letter-spacing: -0.14px;
`;

const SImg = styled.img`
  display: flex;
  height: 170px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 30px;
`;

const SImgS = styled.img`
  display: flex;
  height: 170px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const STitleAndMainTextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;
const SMainP = styled.p`
  color: #313737;
  font-size: 16px;
  font-weight: 700;
`;

const STitleAndMainTextInput = styled.input`
  display: flex;
  width: 300px;
  height: 19px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--border, #d9d9d9);
`;

const SProductDetailDiv = styled.div`
  display: flex;
  height: 16px;
  padding: 20px 25px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
`;

const SProductDetailP = styled.p`
  color: #1a1c3d;
  font-size: 20px;
  font-weight: 400;
`;

const SCostAndDayDiv = styled.div`
  display: flex;
  padding: 0px 25px;
  justify-content: space-between;
  align-self: stretch;
`;

const SCDDiv = styled.div`
  display: flex;
  width: 223.092px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 18px;
`;

const SCDInput = styled.input`
  display: flex;
  width: 150px;
  height: 19px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--border, #d9d9d9);
`;

const SDRFDiv = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 18px;
`;

const SSubP = styled.p`
  color: #1a1c3d;
  font-size: 12px;
  font-weight: 400;
`;

const SDCDiv = styled.div`
  display: flex;
  width: 223.092px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 18px;
`;

// const SDayDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 10px;
//   flex-shrink: 0;
//   align-self: stretch;
// `;

const SButtons = styled.div`
  display: flex;
  padding-bottom: 0px;
  justify-content: center;
  align-items: center;
  gap: 63px;
  margin-bottom: 25px;
`;

const SProposalBtn = styled.button`
  display: flex;
  width: 106px;
  height: 40px;
  padding: 10px 40px;
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

const SNoBtn = styled.button`
  display: flex;
  width: 106px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: #d9d9d9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.14px;
`;

// const SCalendarDate = styled.div`
//   display: flex;
//   gap: 30px;
// `;

const SLRBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
`;

const SLRBtns = styled.button`
  display: flex;
  width: 60px;
  height: 30px;
  padding: 10px 40px;
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

const SDropdownMenu = styled.div`
  position: absolute;
  z-index: 1;
  width: 106px;
  border-radius: 10px;
  top: 346px;
`;

const SDropdownMenuItem = styled.button`
  height: 41px;
  padding: 11px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
  display: flex;
  width: 106px;
  gap: 10px;
  border-radius: 7px;
  background: #e9d5ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border, #d9d9d9);
`;
