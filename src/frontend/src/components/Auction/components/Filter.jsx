import React from "react";
import styled from "styled-components";
import { images } from "../../../assets/images";

const product = ["키보드", "마우스", "헤드폰", "태블릿"];
const day = ["1일", "7일", " 14일", "30일"];

const Filter = ({
  isActive,
  onToggle,
  productType,
  dayType,
  onProductTypeClick,
  onDayTypeClick,
  onReset,
  onApply,
}) => {
  return (
    <>
      {isActive ? (
        <SOpenFilter>
          <SFilterHeader>
            <SPageText>상세검색</SPageText>
            <img src={images.up} alt="React" onClick={onToggle} />
          </SFilterHeader>
          <SFilterProductType>
            <SFilterProduct>
              <SPageText>분류</SPageText>
              <SSelectProduct>
                {product.map((product, index) => {
                  return (
                    <SSelectProductBtn
                      key={index}
                      onClick={() => onProductTypeClick(index)}
                      $activeProduct={productType === index}
                    >
                      {product}
                    </SSelectProductBtn>
                  );
                })}
              </SSelectProduct>
            </SFilterProduct>
            <SFilterProduct>
              <SPageText>대여 기간</SPageText>
              <SSelectProduct>
                {day.map((day, index) => {
                  return (
                    <SSelectDayBtn
                      key={index}
                      onClick={() => onDayTypeClick(index)}
                      $activeDay={dayType === index}
                    >
                      {day}
                    </SSelectDayBtn>
                  );
                })}
              </SSelectProduct>
            </SFilterProduct>
          </SFilterProductType>
          <SFilterFooter>
            <SResetBtn onClick={onReset}>초기화</SResetBtn>
            <SOKBtn onClick={onApply}>적용</SOKBtn>
          </SFilterFooter>
        </SOpenFilter>
      ) : (
        <SNotOpenFilter>
          <SPageText>상세검색</SPageText>
          <img src={images.down} alt="React" onClick={onToggle} />
        </SNotOpenFilter>
      )}
    </>
  );
};

const SNotOpenFilter = styled.div`
  display: flex;
  width: 800px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--primary, #e9d5ff);
`;

const SOpenFilter = styled.div`
  display: flex;
  width: 800px;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  border: 1px solid var(--primary, #e9d5ff);
`;

const SFilterHeader = styled.div`
  display: flex;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const SFilterProductType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SFilterProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const SFilterFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SPageText = styled.p`
  color: #000;
  font-family: SF Pro Rounded;
  font-size: 12px;
  font-weight: 700;
`;

const SSelectProduct = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const SSelectProductBtn = styled.button`
  display: flex;
  width: 74px;
  height: 26px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 115px;
  border: 1px solid ${(props) => (props.$activeProduct ? "#A255F7" : "#D9D9D9")};
  background: #fff;
  cursor: pointer;
  color: ${(props) => (props.$activeProduct ? "#A255F7" : "#D9D9D9")};
`;

const SSelectDayBtn = styled.button`
  display: flex;
  width: 74px;
  height: 26px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 115px;
  border: 1px solid ${(props) => (props.$activeDay ? "#A255F7" : "#D9D9D9")};
  background: #fff;
  cursor: pointer;
  color: ${(props) => (props.$activeDay ? "#A255F7" : "#D9D9D9")};
`;

const SResetBtn = styled.button`
  display: flex;
  height: 27px;
  padding: 18px 25px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--cancel, #d9d9d9);
  color: #fff;
`;

const SOKBtn = styled.button`
  display: flex;
  height: 27px;
  padding: 18px 25px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--primary, #e9d5ff);
  color: #fff;
`;

export default Filter;
