import React, { useEffect, useState } from "react";
import axios from "axios";
import CCheckBox from "../Common/CCheckBox";
import ImgMediaCard from "./components/Carditem";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";


const product = ["키보드", "마우스", "헤드셋", "태블릿"];
const day = ["1일", "7일", " 14일", "30일"];

const Store = () => {

  const [filter, setFilter] = useState(false);
  const [productType, setProductType] = useState("");
  const [dayType, setDayType] = useState("");
  const [seeProductCheck, setseeProductCheck] = useState(false);
  const [data, setData] = useState(initialData());
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [priceRange, setPriceRange] = useState([25000, 75000]);
  const isLogin = useSelector(state => state.login.isLogin);
  const navigate = useNavigate();

  function initialData() {
    return [
      { id: 1, isRented: false, isReservation: false },
      { id: 2, isRented: true, isReservation: false },
      { id: 3, isRented: false, isReservation: true },
      { id: 4, isRented: false, isReservation: false },
      { id: 5, isRented: false, isReservation: false },
      { id: 6, isRented: false, isReservation: true },
      { id: 7, isRented: false, isReservation: false },
      { id: 8, isRented: false, isReservation: false },
      { id: 9, isRented: true, isReservation: true },
    ];
  }

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
    setPriceRange([25000, 75000]);
  };
  const seeProductCheckHandler = (e) => {
    setseeProductCheck(e.target.checked);
  };
  const loadMoreData = () => {
    if (data.length === 0 || loading) return;

    setLoading(true);

    const params = {};
    if (productType !== "") params.productType = productType;
    if (dayType !== "") params.dayType = dayType;

    // axios
    // .get(`/api/data`, { params: { page: page + 1, ...params } })
    // .then((response) => {
    //   setData(data.concat(response.data));
    //   setPage(page + 1);
    // })
    // .catch((err) => {
    //   console.error(err);
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
  };
  const handleScroll = () => {
    const scrollTTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.scrollHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTTop + clientHeight >= scrollHeight) {
      loadMoreData();
    }
  };
  const handleLike = (item) => {
    console.log(likedItems, item, "test");
    if (likedItems.includes(item)) {
      setLikedItems((prevLikedItems) =>
        prevLikedItems.filter((likedItem) => likedItem !== item)
      );
    } else {
      setLikedItems((prevLikedItems) => [...prevLikedItems, item]);
    }
  };
  const onClickHandler = () => {
    console.log(isLogin);
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "게시글 작성은 로그인 후 가능합니다.",
        html: "",
        timer: 1000,
        showConfirmButton: false,
      })
      navigate("/login");
    } else {
      navigate("/store/write");
    }
  };
  const handleCardClick = (id) => {
    console.log(id)
    navigate(`${id}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    console.log(productType, dayType, likedItems);
  }, [productType, dayType, likedItems]);

  return (
    <Smain>
      <div>
        {filter ? (
          <SOpenFilter>
            <SFilterHeader>
              <SPageText>상세검색</SPageText>
              <button onClick={handleFilterToggle}>⌃</button>
            </SFilterHeader>
            <SFilterProductType>
              <SFilterProduct>
                <SPageText>분류</SPageText>
                <SSelectProduct>
                  {product.map((product, index) => {
                    return (
                      <SSelectProductBtn
                        key={index}
                        onClick={() => handleProductTypeChange(index)}
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
                defaultValue={[25000, 75000]}
                step={1000}
                onChange={(value) => setPriceRange(value)}
              />
            </SFilterGageBar>
            <SFilterFooter>
              <SResetBtn onClick={resetDayAndProduct}>초기화</SResetBtn>
              <SOKBtn>적용</SOKBtn>
            </SFilterFooter>
          </SOpenFilter>
        ) : (
          <SNotOpenFilter>
            <SPageText>상세검색</SPageText>
            <button onClick={handleFilterToggle}>⌄</button>
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
                  onLike={handleLike}
                  onClick={() => handleCardClick(item.id)}
                />
              ))}
        </SCardList>
      </div>
    </Smain>
  );
};

const Smain = styled.div`
margin-top: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
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
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const SGage = styled(Slider)`
  width: 255px;
  height: 13px;
`;

export default Store;
