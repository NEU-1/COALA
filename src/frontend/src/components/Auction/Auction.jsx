import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { images } from "../../assets/images";
import { login } from "../../store/LoginSlice";
import { requestPost, setToken } from "../../lib/api/api";

const product = ["키보드", "마우스", "헤드셋", "태블릿"];
const day = ["1일", "7일", " 14일", "30일"];

const Auction = () => {
  console.log("Auction 컴포넌트가 렌더링됩니다.");

  const [filter, setFilter] = useState(false);
  const [productType, setProductType] = useState("");
  const [dayType, setDayType] = useState("");
  const [data, setData] = useState([]);
  const [size, setSize] = useState("");
  const [pageGroup, setPageGroup] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);
  const isLogin = login;
  const navigate = useNavigate();
  const maxPages = Math.ceil(size / 10);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    setToken();
    requestPost(`auction/list?page=${currentPage}`, {
      category: productType,
      minRentalPeriod: 1,
      status: 1,
    })
      .then((res) => {
        const { list, size } = res.data;
        setData(list);
        setSize(size);
      })
      .catch(console.log);
  };

  const handleFilterToggle = () => {
    setFilter(!filter);
  };

  const applyFilter = () => {
    setToken();
    let category = productType === "" ? "" : productType + 1;
    const dayTypeMapping = {
      "0": 1,
      "1": 7,
      "2": 14,
      "3": 30
    };
    const minRentalPeriod = dayTypeMapping[dayType] || "";

    requestPost(`auction/list?page=${currentPage}`, {
      category,
      minRentalPeriod,
      status: 1,
    })
      .then((res) => {
        setData(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProductTypeChange = (index) => {
    if (productType === index) {
      setProductType(""); 
    } else {
      setProductType(index);
    }
  };

  const handleDayTypeChange = (index) => {
    if (dayType === index) {
    setDayType(""); 
  } else {
    setDayType(index);
  }
  };
  const resetDayAndProduct = () => {
    setProductType("");
    setDayType("");
  };
  const handlePageClick = (page) => {
    setcurrentPage(page - 1);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 1) {
      setPageGroup(pageGroup - 1);
    }
  };
  const handleNextGroup = () => {
    if (pageGroup * 5 < maxPages) {
      setPageGroup(pageGroup + 1);
    }
  };
  const generatePagenationNumbers = () => {
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = Math.min(startPage + 4, maxPages);
    return [...Array(endPage - startPage + 1).keys()].map(
      (idx) => startPage + idx
    );
  };

  const handleListClick = (id) => {
    navigate(`${id}`);
  };

  const calculateDaysAgo = (writeday) => {
    const currentDate = new Date();
    const writeDate = new Date(writeday);

    const diffTime = Math.abs(currentDate - writeDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
    if (diffDays === 0) {
      return "오늘";
    }
    return `${diffDays}일 전`;
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
      <SAuctionList>
        <SAuctionDetailHead>
          <SAuctionTitleP1>분류</SAuctionTitleP1>
          <SAuctionTitleP2>제목</SAuctionTitleP2>
          <SAuctionTitleP3>최소 대여 기간</SAuctionTitleP3>
          <SAuctionTitleP4>작성일</SAuctionTitleP4>
        </SAuctionDetailHead>
        <SCardList>
          {data &&
            data.map((item, index) => (
              <SAuctionDetail
                key={index}
                onClick={() => handleListClick(item.id)}
              >
                <SAuctionP1>{item.category.name}</SAuctionP1>
                <SAuctionP2>{item.title}</SAuctionP2>
                <SAuctionP3>{item.minRentalPeriod}일</SAuctionP3>
                <SAuctionP4>{calculateDaysAgo(item.createdAt)}</SAuctionP4>
              </SAuctionDetail>
            ))}
        </SCardList>
      </SAuctionList>
      <SChangePageAndCreateBtn>
        <SChangePage>
          <SFooterText onClick={handlePrevGroup}>&lt;</SFooterText>
          {generatePagenationNumbers().map((item, index) => (
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
  // gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

// const SGage = styled(Slider)`
//   width: 255px;
//   height: 13px;
// `;

const SAuctionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const SAuctionDetailHead = styled.div`
  display: flex;
  width: 800px;
  padding: 0px 37px;
  justify-content: space-between;
  align-items: center;
`;

const SAuctionDetail = styled.div`
  display: flex;
  width: 800px;
  padding: 20px 37px;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px silver;
  &:hover {
    background: var(--primary, #e9d5ff);
  }
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
  width: 100px;
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
  font-size: 16px;
  font-weight: 700;
  width: 40px;
  text-align: center;
`;
