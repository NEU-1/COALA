import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login as isLogin } from "../../store/LoginSlice";
import { requestPost, setToken } from "../../lib/api/api";
import Filter from "./components/Filter";

const Auction = () => {
  const initialState = {
    filter: false,
    productType: "",
    dayType: "",
    data: [],
    size: 0,
    pageGroup: 1,
    currentPage: 0,
  };

  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const { filter, productType, dayType, data, size, pageGroup, currentPage } =
    state;

  useEffect(() => {
    fetchDataWithCurrentParams();
  }, [currentPage]);

  const fetchDataWithCurrentParams = () => {
    setToken();
    const params = {
      category: productType === "" ? "" : productType + 1,
      minRentalPeriod:
        {
          0: 1,
          1: 7,
          2: 14,
          3: 30,
        }[dayType] || 1,
      status: 1,
    };

    requestPost(`auction/list?page=${currentPage}`, params)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          data: res.data.list,
          size: res.data.size,
        }));
      })
      .catch(console.log);
  };

  const toggleFilter = () => setState((prev) => ({ ...prev, filter: !filter }));
  const handleProductTypeClick = (index) =>
    setState((prev) => ({
      ...prev,
      productType: productType === index ? "" : index,
    }));
  const handleDayTypeClick = (index) =>
    setState((prev) => ({ ...prev, dayType: dayType === index ? "" : index }));
  const handlePageClick = (index) =>
    setState((prev) => ({ ...prev, currentPage: index }));
  const resetFilters = () =>
    setState((prev) => ({ ...prev, productType: "", dayType: "" }));
  const applyFilters = () => fetchDataWithCurrentParams();

  const maxPages = Math.ceil(size / 10);

  const handlePagination = (modifier) => {
    const nextPageGroup = pageGroup + modifier;
    const isWithinRange =
      modifier > 0 ? nextPageGroup * 5 < maxPages : nextPageGroup > 1;

    if (isWithinRange) {
      setState((prev) => ({ ...prev, pageGroup: nextPageGroup }));
    }
  };

  const generatePageNumbers = () => {
    const numbers = [];
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = startPage + 4;
  
    for (let i = startPage; i <= Math.min(endPage, maxPages); i++) {
      numbers.push(i);
    }
    return numbers;
  };
  

  const handleListClick = (id) => navigate(`${id}`);

  const calculateDaysAgo = (writeday) => {
    const currentDate = new Date();
    const writeDate = new Date(writeday);
    const diffDays = Math.ceil(
      (currentDate - writeDate) / (1000 * 60 * 60 * 24) - 1
    );
    return diffDays === 0 ? "오늘" : `${diffDays}일 전`;
  };

  const onClickHandler = () => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "게시글 작성은 로그인 후 가능합니다.",
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
      <Filter
        isActive={state.filter}
        onToggle={toggleFilter}
        productType={state.productType}
        dayType={state.dayType}
        onProductTypeClick={handleProductTypeClick}
        onDayTypeClick={handleDayTypeClick}
        onReset={resetFilters}
        onApply={applyFilters}
      />

      <SAuctionList>
        <SAuctionDetailHead>
          <SAuctionTitleP1>분류</SAuctionTitleP1>
          <SAuctionTitleP2>제목</SAuctionTitleP2>
          <SAuctionTitleP3>최소 대여 기간</SAuctionTitleP3>
          <SAuctionTitleP4>작성일</SAuctionTitleP4>
        </SAuctionDetailHead>
        <SCardList>
          {state.data &&
            state.data.map((item, index) => (
              <SAuctionDetail
                key={item.id}
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
          <SFooterText onClick={handlePagination(-1)}>&lt;</SFooterText>
          {generatePageNumbers().map((item, index) => (
            <SFooterText
              key={index}
              onClick={() => {
                handlePageClick(item - 1);
              }}
            >
              {item}
            </SFooterText>
          ))}
          <SFooterText onClick={handlePagination(1)}>&gt;</SFooterText>
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
  gap: 216px;
`;

const SCardList = styled.div`
  display: flex;
  width: 800px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

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
