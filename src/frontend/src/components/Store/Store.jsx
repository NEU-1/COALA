import React, { useEffect, useRef, useState } from "react";
import CCheckBox from "../Common/CCheckBox";
import ImgMediaCard from "./components/Carditem";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { images } from "../../assets/images";
import { login } from "../../store/LoginSlice";
import { requestPost, setToken } from "../../lib/api/api";

const product = ["키보드", "마우스", "헤드셋", "태블릿"];
const day = ["1일", "1일 이상", " 7일 이상", "30일 이상"];

const Store = () => {
  const [filter, setFilter] = useState(false);
  const [productType, setProductType] = useState("");
  const [dayType, setDayType] = useState("");
  const [seeProductCheck, setseeProductCheck] = useState(false);
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const pageRef = useRef(-1);
  const isLogin = login;
  const navigate = useNavigate();
  const handleFilterToggle = () => {
    setFilter(!filter);
  };

  const handleProductTypeChange = (index) => {
    setProductType(index);
  };

  const handleDayTypeChange = (index) => {
    setDayType(index);
  };
  const resetDayAndProduct = () => {
    setProductType("");
    setDayType("");
    setPriceRange([0, 100000]);
  };
  const applyFilter = () => {
    pageRef.current = -1; 
    setData([]); 
    loadMoreData();
};

  const seeProductCheckHandler = (e) => {
    setseeProductCheck(e.target.checked);
  };
  const loadMoreData = () => {
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;

    const params = {
      category: productType,
      minRentalPeriod: dayType,
      minRentalCost: priceRange[0],
      maxRentalCost: priceRange[1],
      status: seeProductCheck,
    };

    requestPost(`store/list?page=${nextPage}`, params)
      .then((response) => {
        setData((prevData) => [...prevData, ...response.data.list]);
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const handleScroll = () => {
    const scrollTTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollBottom = Math.ceil(scrollTTop + clientHeight);

    if (scrollBottom >= scrollHeight) {
      loadMoreData();
    }
  };

  const onClickHandler = () => {
    console.log(isLogin);
    if (!isLogin) {
      // if (isLogin) {
      Swal.fire({
        icon: "warning",
        title: "게시글 작성은 로그인 후 가능합니다.",
        html: "",
        timer: 1000,
        showConfirmButton: false,
      });
      navigate("/login");
    } else {
      navigate("/store/write");
    }
  };
  const handleCardClick = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setToken(); 
    loadMoreData();
  }, []);

  return (
    <Smain>
      <div>
        {filter ? (
          <SOpenFilter>
            <SFilterHeader>
              <SPageText>상세검색</SPageText>
              <img src={images.up} alt="React" onClick={handleFilterToggle} />
            </SFilterHeader>
            <SFilterProductType>
              <SFilterProduct>
                <SPageText>분류</SPageText>
                <SSelectProduct>
                  {product.map((product, index) => {
                    const Nindex = index + 1;
                    return (
                      <SSelectProductBtn
                        key={index}
                        onClick={() => handleProductTypeChange(Nindex)}
                        $activeProduct={productType === Nindex}
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
                        onClick={() => handleDayTypeChange(index)}
                        $activeDay={dayType === index}
                      >
                        {day}
                      </SSelectDayBtn>
                    );
                  })}
                </SSelectProduct>
              </SFilterProduct>
            </SFilterProductType>
            <SFilterGageBar>
              <STextCost>가격</STextCost>
              <div>
                {priceRange[0]} - {priceRange[1]}
              </div>
              <SGage
                range
                min={0}
                max={100000}
                defaultValue={[0, 100000]}
                step={1000}
                onChange={(value) => setPriceRange(value)}
              />
            </SFilterGageBar>
            <SFilterFooter>
              <SResetBtn onClick={resetDayAndProduct}>초기화</SResetBtn>
              <SOKBtn onClick={applyFilter}>적용</SOKBtn>
            </SFilterFooter>
          </SOpenFilter>
        ) : (
          <SNotOpenFilter>
            <SPageText>상세검색</SPageText>
            <img src={images.down} alt="React" onClick={handleFilterToggle} />
          </SNotOpenFilter>
        )}
      </div>
      <div>
        <SCheckboxAndCreateBtn>
          <CCheckBox
            text={"대여 완료 상품 보기"}
            checked={seeProductCheck}
            onChange={seeProductCheckHandler}
          />
          <SOKBtn onClick={onClickHandler}>등록</SOKBtn>
        </SCheckboxAndCreateBtn>
      </div>
      <div>
        <SCardList>
          {data &&
            data
              .filter((item) => (seeProductCheck ? true : !item.isRented))
              .map((item, index) => (
                <ImgMediaCard
                  key={index}
                  item={item}
                  onClick={() => handleCardClick(item.storePost.id)}
                />
              ))}
        </SCardList>
      </div>
    </Smain>
  );
};

const Smain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 170px;
`;

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

const SFilterGageBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
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

const STextCost = styled.p`
  color: #000;
  text-align: center;
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

const SCheckboxAndCreateBtn = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-between;
  align-items: center;
`;

const SCardList = styled.div`
  display: flex;
  width: 800px;
  gap: 17px;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
`;

const SGage = styled(Slider)`
  width: 255px;
  height: 13px;
`;

export default Store;
