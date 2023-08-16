
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import { requestPost, setToken } from "../../lib/api/api";

const AuctionWrite = () => {
  const product = ["키보드", "마우스", "헤드폰", "태블릿"];
  const day = ["1일", "7일", " 14일", "30일"];

  const [mySell, setMySell] = useState([111111, 222222, 33333]);
  const [showDropdown, setshowDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [minRentalDay, setMinRentalDay] = useState("");
  const [content, setContent] = useState("");
  const [productSelect, setProductSelect] = useState("");
  const [mindaySelect, setMinDaySelect] = useState("");

  const navigate = useNavigate();

  // const mySellHandler = () => {
  //   setshowDropdown(!showDropdown);
  //   axios
  //     .get("--서버 주소--")
  //     .then((response) => {
  //       const data = response.data;
  //       setMySell(data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  };
  useEffect(()=> {
    window.scrollTo(0,0);
  },[]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const minRentalDayHandler = (e) => {
    setMinRentalDay(e.target.value);
  };
  const contentHandler = (e) => {
    setContent(e.target.value);
  };
  const productSelectHandler = (index) => {
    setProductSelect(index);
  };
  const minDaySelectHandler = (index) => {
    setMinDaySelect(index);
    const minDayValue = day[index];
    const minDayNumber = parseInt(
      minDayValue.substring(0, minDayValue.indexOf("일"))
    );
    setMinRentalDay(minDayNumber);
  };

  const goBackBtn = () => {
    navigate("/store");
  };
  const validateForm = () => {
    return {
      isValid:
        title !== "" &&
        productSelect !== "" &&
        minRentalDay !== "" &&
        content !== "",
      errorField:
        title === ""
          ? "제목"
          : productSelect === ""
          ? "분류"
          : minRentalDay === ""
          ? "최소 대여 기간"
          : content === ""
          ? "내용"
          : "최대 기간 >= 최소 기간",
    };
  };

  const displayMessage = (type, message) => {
    Swal.fire({
      icon: type,
      title: message,
      html: "",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  const goSellBtn = () => {
    console.log({
      title,
      content,
      minRentalDay,
      productSelect,
    });

    const validation = validateForm();
    console.log(validation);

    if (validation.isValid) {
      setToken();
      requestPost("auction/write", {
        title: title,
        detail: content,
        minRentalPeriod: minRentalDay,
        category: productSelect + 1,
      })
        .then((response) => {
          displayMessage("success", "게시글 등록됨");
          console.log(response);
          console.log(content);
          navigate("/auction");
        })
        .catch((error) => {
          displayMessage("error", "게시글 등록에 실패하였습니다.");
        });
    } else {
      displayMessage("warning", `${validation.errorField}을(를) 입력해주세요.`);
    }
  };

  return (
    <SMain>
      <SHeader>
        <STittleAndBtn>
          <STitle>게시글 등록</STitle>
          <SCallMyProductBtn onClick={mySellHandler}>
            <SBtnText>내 제품 불러오기</SBtnText>
            {showDropdown && (
              <SDropdownMenu>
                {mySell.map((item, index) => (
                  <SDropdownMenuItem key={index}>{item}</SDropdownMenuItem>
                ))}
              </SDropdownMenu>
            )}
          </SCallMyProductBtn>
        </STittleAndBtn>
        <SImportantText>*필수 항목</SImportantText>
      </SHeader>
      <SSellHeader>
        <SSellHeaderPading>
          <SSubTitle>
            제목<SImportantStar>*</SImportantStar>
          </SSubTitle>
          <SSellTitleInput
            className="title"
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={titleHandler}
          />
        </SSellHeaderPading>
      </SSellHeader>
      <SFilterContainer>
        <SFilterDoubleBox>
          <SFilterBoxGap35>
            <SSubTitle>
              분류<SImportantStar>*</SImportantStar>
            </SSubTitle>
            <SSelectProduct>
              {product.map((day, index) => {
                return (
                  <SSelectProductBtn
                    key={index}
                    onClick={() => productSelectHandler(index)}
                    $activeProduct={productSelect === index}
                  >
                    {day}
                  </SSelectProductBtn>
                );
              })}
            </SSelectProduct>
          </SFilterBoxGap35>
          <SFilterBoxGap10>
            <SSubTitle>
              최소 대여 기간<SImportantStar>*</SImportantStar>
            </SSubTitle>
            <SSelectProduct>
              {day.map((day, index) => {
                return (
                  <SSelectDayBtn
                    key={index}
                    onClick={() => minDaySelectHandler(index)}
                    $activeDay={mindaySelect === index}
                  >
                    {day}
                  </SSelectDayBtn>
                );
              })}
            </SSelectProduct>
            <SFilterInputDay
              className="minRentalDay"
              type="text"
              placeholder="숫자만 입력하세요."
              value={minRentalDay}
              onChange={minRentalDayHandler}
            />
          </SFilterBoxGap10>
        </SFilterDoubleBox>
      </SFilterContainer>
      <SContent>
        <SContentBorder>
          <SSubTitle>
            내용<SImportantStar>*</SImportantStar>
          </SSubTitle>
          <SSellContentInput
            className="content"
            type="text"
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={contentHandler}
          />
        </SContentBorder>
      </SContent>
      <SSellFooter>
        <SFooterBtnMargin>
          <SBtnGoBack onClick={goBackBtn}>취소</SBtnGoBack>
        </SFooterBtnMargin>
        <SFooterBtnMargin>
          <SBtnWritePost onClick={goSellBtn}>등록</SBtnWritePost>
        </SFooterBtnMargin>
      </SSellFooter>
    </SMain>
  );
};
export default AuctionWrite;

const SMain = styled.div`
  margin-top: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   gap: 30px;
`;

const SHeader = styled.div`
  display: flex;
  width: 800px;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border-bottom: 2px solid var(--title-underline, #a255f7);
`;

const STittleAndBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 180px;
`;

const STitle = styled.p`
  color: var(--black, #000);
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
`;

const SCallMyProductBtn = styled.button`
  display: flex;
  width: 143px;
  height: 41px;
  padding: 11px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: var(--primary, #e9d5ff);
`;

const SBtnText = styled.p`
  color: var(--white, #fff);
  text-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  font-family: Inter;
  font-weight: 700;
`;

const SImportantText = styled.p`
  color: var(--necessary, #fb1818);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-self: stretch;
`;

const SSellHeader = styled.div`
  display: flex;
  width: 800px;
  padding: 30px 20px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
  margin: 0px;
`;

const SSellHeaderPading = styled.div`
  display: flex;
  gap: 30px;
`;

const SSubTitle = styled.p`
  color: var(--black, #000);
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const SImportantStar = styled.span`
  width: 8px;
  height: 24px;
  color: var(--necessary, #fb1818);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

const SSellTitleInput = styled.input`
  color: #000;
  // text-align: center;
  font-size: 20px;
  font-weight: 700;
  width: 600px;
`;

const SFilterContainer = styled.div`
  display: flex;
  width: 800px;
  padding: 30px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
`;

const SFilterDoubleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const SFilterBoxGap35 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 35px;
`;

const SFilterBoxGap10 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  width: 320px;
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

const SFilterInputDay = styled.input`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid var(--border, #d9d9d9);
  &::placeholder {
    color: #d9d9d9;
  }
`;

const SContent = styled.div`
  display: flex;
  width: 800px;
  padding: 30px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
`;

const SContentBorder = styled.div`
  display: flex;
  gap: 50px;
  align-self: stretch;
`;

const SSellContentInput = styled.textarea`
  color: #000;
  // text-align: center;
  height: 400px;
  font-size: 20px;
  font-weight: 700;
  width: 600px;
  // overflow: hidden;
  resize: none;
`;

const SSellFooter = styled.div`
  display: flex;
  width: 800px;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
`;

const SFooterBtnMargin = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SBtnGoBack = styled.button`
  display: flex;
  height: 50px;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: #d9d9d9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  text-align: center;
  text-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
`;

const SBtnWritePost = styled.div`
  display: flex;
  height: 50px;
  padding: 10px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: #e9d5ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  text-align: center;
  text-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
`;

const SDropdownMenu = styled.div`
  position: absolute;
  background: var(--primary, #e9d5ff);
  z-index: 30;
  width: 143px;
  padding: 11px 16px;
  border-radius: 10px;
  top: 240px;
`;

const SDropdownMenuItem = styled.div`
  height: 41px;
  padding: 11px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
`;
