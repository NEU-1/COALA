import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { images } from "../../assets/images";

const product = ["키보드", "마우스", "헤드셋", "태블릿"];
const day = ["1일", "7일", " 14일", "30일"];

const Auction = () => {
  const [filter, setFilter] = useState(false);
  const [productType, setProductType] = useState("");
  const [dayType, setDayType] = useState("");
  const [data, setData] = useState(initialData());
  const [priceRange, setPriceRange] = useState([25000, 75000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const isLogin = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  function initialData() {
    return [
      {
        id: 1,
        product: "키보드",
        title: "안녕하세요",
        minday: 7,
        writeday: "08.07",
      },
      {
        id: 2,
        product: "마우스",
        title: "테스트중입니다",
        minday: 5,
        writeday: "08.06",
      },
      {
        id: 3,
        product: "헤드셋",
        title: "음질이 좋아요",
        minday: 3,
        writeday: "08.05",
      },
      {
        id: 4,
        product: "태블릿",
        title: "그림 그리기 최고",
        minday: 6,
        writeday: "08.04",
      },
      {
        id: 5,
        product: "키보드",
        title: "빠른 반응 속도",
        minday: 2,
        writeday: "08.03",
      },
      {
        id: 6,
        product: "마우스",
        title: "게이밍용",
        minday: 4,
        writeday: "08.02",
      },
      {
        id: 7,
        product: "헤드셋",
        title: "노이즈 캔슬링",
        minday: 1,
        writeday: "08.01",
      },
      {
        id: 8,
        product: "태블릿",
        title: "반응속도 빠름",
        minday: 8,
        writeday: "01.31",
      },
      {
        id: 9,
        product: "키보드",
        title: "무선",
        minday: 9,
        writeday: "07.30",
      },
      {
        id: 10,
        product: "마우스",
        title: "도트갯수 조절 가능",
        minday: 6,
        writeday: "07.29",
      },
      {
        id: 11,
        product: "헤드셋",
        title: "베이스 강화",
        minday: 7,
        writeday: "07.28",
      },
      {
        id: 12,
        product: "태블릿",
        title: "멀티터치",
        minday: 5,
        writeday: "07.27",
      },
      {
        id: 13,
        product: "키보드",
        title: "백라이트",
        minday: 4,
        writeday: "07.26",
      },
      {
        id: 14,
        product: "마우스",
        title: "무게 조절",
        minday: 3,
        writeday: "07.25",
      },
      {
        id: 15,
        product: "헤드셋",
        title: "편안한 착용감",
        minday: 2,
        writeday: "07.24",
      },
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
  const handlePageClick = (page) => {
    setCurrentPage(page);
    const startItem = (page - 1) * itemsPerPage;
    const endItem = page * itemsPerPage;
    setData(initialData().slice(startItem, endItem));
  };
  const handlePrevGroup = () => {
    if (pageGroup > 1) {
      setPageGroup(pageGroup - 1);
    }
  };
  const handleNextGroup = () => {
    setPageGroup(pageGroup + 1);
  };
  const generagePagenationNumbers = () => {
    const startPage = (pageGroup - 1) * 5 + 1;
    return Array.from({ length: 5 }, (_, idx) => startPage + idx);
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
      });
      navigate("/login");
    } else {
      navigate("/auction/write");
    }
  };
  const handleListClick = (id) => {
    console.log(id);
    navigate(`${id}`);
  };

  const calculateDaysAgo = (writeday) => {
    const currentDate = new Date();
    const writeDate = new Date(writeday);
    
    const diffTime = Math.abs(currentDate - writeDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))-8036; 
    if (diffDays === 0) {
      return '오늘'
    }
  
    return `${diffDays}일 전`;
  };

  useEffect(() => {
    console.log(productType, dayType);
  }, [productType, dayType]);

  return (
    <Smain>
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
            {priceRange[0]} - {priceRange[1]}
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
          <img src={images.down} alt="React" onClick={handleFilterToggle} />
        </SNotOpenFilter>
      )}
      <SAuctionList>
        <SAuctionDetail>
          <SAuctionTitleP1>분류</SAuctionTitleP1>
          <SAuctionTitleP2>제목</SAuctionTitleP2>
          <SAuctionTitleP3>최소기간</SAuctionTitleP3>
          <SAuctionTitleP4>작성일</SAuctionTitleP4>
        </SAuctionDetail>
        <SCardList>
          {data.map((item, index) => (
            <SAuctionDetail onClick={() => handleListClick(item.id)}>
              <SAuctionP1>{item.product}</SAuctionP1>
              <SAuctionP2>{item.title}</SAuctionP2>
              <SAuctionP3>{item.minday}일</SAuctionP3>
              <SAuctionP4>{calculateDaysAgo(item.writeday)}</SAuctionP4>
            </SAuctionDetail>
          ))}
        </SCardList>
      </SAuctionList>
      <SChangePageAndCreateBtn>
        <SChangePage>
          <SFooterText onClick={handlePrevGroup}>&lt;</SFooterText>
          {generagePagenationNumbers().map((item, index) => (
            <SFooterText
              key={index}
              onClick={() => {
                handlePageClick(item);
              }}
            >
              {item}
            </SFooterText>
          ))}
          <SFooterText onClick={handleNextGroup}>&gt;</SFooterText>
        </SChangePage>
        <SOKBtn onClick={onClickHandler}>등록</SOKBtn>
      </SChangePageAndCreateBtn>
    </Smain>
  );
};
export default Auction;

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

const SChangePageAndCreateBtn = styled.div`
  display: flex;
  // padding: 0px 35px;
  // justify-content: flex-end;
  gap: 216px;
  // align-self: stretch;
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

const SAuctionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const SAuctionDetail = styled.div`
  display: flex;
  width: 800px;
  padding: 0px 37px;
  justify-content: space-between;
  align-items: center;
`;
const SAuctionTitleP1 = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 50px;
  text-align: center;
`;

const SAuctionTitleP2 = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const SAuctionTitleP3 = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 60px;
`;
const SAuctionTitleP4 = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 50px;
`;

const SAuctionP1 = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 50px;
  text-align: center;
`;

const SAuctionP2 = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const SAuctionP3 = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 60px;
  text-align: center;
`;
const SAuctionP4 = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 70px;
  text-align: center;
`;
const SChangePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 300px;
`;

const SFooterText = styled.p`
  font-family: SF Pro Rounded;
  font-size: 12px;
  font-weight: 700;
`;
