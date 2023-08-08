import React, { useState } from "react";
import { styled } from "styled-components";
import { images } from "../../../assets/images";
import CCheckBox from "../../Common/CCheckBox";
import axios from "axios";

const TradeOfferForm = ({ onClose }) => {
  const [imageList, setImageList] = useState([]);
  const [bargain, setBargain] = useState(false);
  const initialState = {
    rentalFee: "",
    deposit: "",
    day: "",
  };
  const [state, setState] = useState(initialState);
  const { rentalFee, deposit, day } = state;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  
  const onUpload = async (e) => {
    const files = e.target.files;
    const newImages = await Promise.all([...files].map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    }));
    setImageList(prev => [...prev, ...newImages]);
  };
  
  const setBargainStatus = (e) => {
    setBargain(e.target.checked);
  };
  const goServer = async() => {
    try{
      const formData = new FormData();
      imageList.forEach((image, index) => {
        formData.append(`image${index}`);
      });
      formData.append('rentalFee', rentalFee);
      formData.append('deposit', deposit);
      formData.append('day', day);
      formData.append('bargain', bargain);
      const response = await axios.post('서버의 URL을 여기에 입력하세요', formData);
      
      if(response.status === 200){
        alert('성공')
      } else {
        alert('실패')
      }
    } catch(err) {
      console.error('통신 오류', err)
    }
  }
  
  const handleCancel = () => {
    onClose && onClose();
  };
  
  
  return (
    <SMain>
      <SImgList>
        {imageList.map((src, index) => {
          return <SImg key={index} src={src} />;
        })}
        <SLabel>
          <input
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => onUpload(e)}
          />
          <img src={images.plus} alt="Plus" />
        </SLabel>
      </SImgList>
      <SDiv>
        <SP>대여료</SP>
        <SInput
          name="rentalFee"
          placeholder="숫자만 입력하세요."
          value={rentalFee}
          onChange={handleChange}
        />
      </SDiv>
      <SDiv>
        <SP>보증금</SP>
        <SInput
          name="deposit"
          placeholder="숫자만 입력하세요."
          value={deposit}
          onChange={handleChange}
        />
      </SDiv>
      <SDiv>
        <SP>기간</SP>
        <SInput
          name="day"
          placeholder="숫자만 입력하세요."
          value={day}
          onChange={handleChange}
        />
      </SDiv>
      <SCheckBox>
        <CCheckBox
          name="bargain"
          text={"가격 흥정 여부"}
          checked={bargain}
          onChange={setBargainStatus}
        />
      </SCheckBox>
      <SButtons>
        <SProposalBtn onClick={goServer}>제안</SProposalBtn>
        <SNoBtn onClick={handleCancel}>취소</SNoBtn>
      </SButtons>
    </SMain>
  );
};

export default TradeOfferForm;

const SMain = styled.div`
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: white;
  border-radius: 10px;
  // width: 500px;
  // height: 650px;
`;

const SImgList = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 15px;
`;

const SImg = styled.img`
  width: 138px;
  height: 101px;
  border-radius: 10px;
`;

const SLabel = styled.label`
  width: 138px;
  height: 101px;
`;

const SDiv = styled.div`
  display: flex;
  width: 291px;
  justify-content: space-between;
  align-items: center;
`;

const SP = styled.p`
  color: #000;
  font-size: 20px;
  font-weight: 400;
`;

const SInput = styled.input`
  display: flex;
  width: 220px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--border, #d9d9d9);
`;

const SCheckBox = styled.div`
  display: flex;
  width: 291px;
  align-items: center;
  gap: 10px;
`;

const SButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 63px;
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
