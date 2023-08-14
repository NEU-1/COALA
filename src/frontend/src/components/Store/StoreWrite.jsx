import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { images } from '../../assets/images';
import Swal from "sweetalert2";


const StoreWrite = () => {
  console.log(images)

  const product = ["키보드", "마우스", "헤드셋", "태블릿"];
  const day = ["1일", "7일", " 14일", "30일"];

  const [mySell, setMySell] = useState([111111, 222222, 33333]);
  const [showDropdown, setshowDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [productName, setproductName] = useState("");
  const [rentalFee, setRentalFee] = useState("");
  const [deposit, setDeposit] = useState("");
  const [minRentalDay, setMinRentalDay] = useState("");
  const [maxRentalDay, setMaxRentalDay] = useState("");
  const [content, setContent] = useState("");
  const [productSelect, setProductSelect] = useState("");
  const [mindaySelect, setMinDaySelect] = useState("");
  const [maxdaySelect, setMaxDaySelect] = useState("");
  const [calendarDay, setCalendarDay] = useState(new Date());
  const [calendar, setCalendar] = useState(false);
  const [imageList, setImageList] = useState([]);

  const mySellHandler = () => {
    setshowDropdown(!showDropdown);
    axios
      .get("--서버 주소--")
      .then((response) => {
        const data = response.data;
        setMySell(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const productNameHandler = (e) => {
    setproductName(e.target.value);
  };
  const rentalFeeHandler = (e) => {
    setRentalFee(e.target.value);
  };
  const depositHandler = (e) => {
    setDeposit(e.target.value);
  };
  const minRentalDayHandler = (e) => {
    setMinRentalDay(e.target.value);
  };
  const maxRentalDayHandler = (e) => {
    setMaxRentalDay(e.target.value);
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
  const maxDaySelectHandler = (index) => {
    setMaxDaySelect(index);
    const maxDayValue = day[index];
    const maxDayNumber = parseInt(
      maxDayValue.substring(0, maxDayValue.indexOf("일"))
    );
    setMaxRentalDay(maxDayNumber);
  };
  const calendarHandler = () => {
    setCalendar(!calendar);
  };

  const year = calendarDay.getFullYear();
  const month = calendarDay.getMonth() + 1;
  const date = calendarDay.getDate();
  const navigate = useNavigate();

  const onUpload = async (e) => {
    const files = e.target.files;
    const newImages = [...imageList];

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      const fileRead = new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });

      reader.readAsDataURL(files[i]);
      const fileData = await fileRead;
      newImages.push(fileData);
    }

    setImageList(newImages);
  };
  const goBackBtn = () => {
    navigate("/store");
  };
  const validateForm = () => {
    return {
      isValid: title !== "" &&
               productSelect !== "" &&
               productName !== "" &&
               rentalFee !== "" &&
               minRentalDay !== "" &&
               maxRentalDay !== "" &&
               content !== "" &&
               maxRentalDay >= minRentalDay,
      errorField: title === "" ? "제목" : 
                  productSelect === "" ? "분류" : 
                  productName === "" ? "제품명" : 
                  rentalFee === "" ? "대여료" :
                  minRentalDay === "" ? "최소 대여 기간" :
                  maxRentalDay === "" ? "최대 대여 기간" :
                  content === "" ? "내용" : "최대 기간 >= 최소 기간"
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
        productName,
        rentalFee,
        minRentalDay,
        maxRentalDay,
        content,
    });

    const validation = validateForm();

    if (validation.isValid) {
      const formData = new FormData();
    formData.append("title", title);
    formData.append("productName", productName);
    formData.append("rentalFee", rentalFee);
    formData.append("minRentalDay", minRentalDay);
    formData.append("maxRentalDay", maxRentalDay);
    formData.append("content", content);
    formData.append("upperLimitDate", `${year}-${month}-${date}`);
    imageList.forEach((image, index) => {
      formData.append("imageList", image, `image${index}.png`);
    });

    axios
      .post("--서버 주소--", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        displayMessage("success", "게시글 등록됨");
        console.log(response);
        navigate("/store");
      })
      .catch((error) => {
        displayMessage("error", "게시글 등록에 실패하였습니다.");
        console.log(error);
      });
    } else {
        displayMessage("warning", `${validation.errorField}을(를) 입력해주세요.`);
    }
};


  useEffect(() => {
    console.log(productSelect, mindaySelect, maxdaySelect, calendarDay);
  }, [productSelect, mindaySelect, maxdaySelect, calendarDay]);

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
            value={title}
            onChange={titleHandler}
          />
        </SSellHeaderPading>
      </SSellHeader>
      <SPicture>
        <SSubTitle>사진 첨부</SSubTitle>
        <SPictureList>
          {imageList.map((src, index) => {
            return <SInsertPicture key={index} src={src} />;
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
        </SPictureList>
      </SPicture>
      <SCalendarDate>
        <SSubTitle>상한 날짜</SSubTitle>
        <SSubTitle
          onClick={calendarHandler}
        >{`${year}년 ${month}월 ${date}일`}</SSubTitle>
      </SCalendarDate>
      {calendar ? (
        <Calendar onChange={setCalendarDay} value={calendarDay} />
      ) : (
        ""
      )}
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
              제품명<SImportantStar>*</SImportantStar>
            </SSubTitle>
            <SFilterInput
              className="productName"
              type="text"
              value={productName}
              onChange={productNameHandler}
            />
          </SFilterBoxGap10>
        </SFilterDoubleBox>
        <SFilterDoubleBox>
          <SFilterBoxGap20>
            <SSubTitle>
              대여료<SImportantStar>*</SImportantStar>
            </SSubTitle>
            <SFilterInFutAndWon>
              <SFilterInputCost
                className="rentalFee"
                type="text"
                placeholder="숫자만 입력하세요."
                value={rentalFee}
                onChange={rentalFeeHandler}
              />
              <p>원</p>
            </SFilterInFutAndWon>
          </SFilterBoxGap20>
          <SFilterBoxGap20>
            <SSubTitle>보증금</SSubTitle>
            <SFilterInFutAndWon>
              <SFilterInputCost
                className="deposit"
                type="text"
                placeholder="숫자만 입력하세요."
                value={deposit}
                onChange={depositHandler}
              />
              <p>원</p>
            </SFilterInFutAndWon>
          </SFilterBoxGap20>
        </SFilterDoubleBox>
        <SFilterDoubleBox>
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
          <SFilterBoxGap10>
            <SSubTitle>
              최대 대여 기간<SImportantStar>*</SImportantStar>
            </SSubTitle>
            <SSelectProduct>
              {day.map((day, index) => {
                return (
                  <SSelectDayBtn
                    key={index}
                    onClick={() => maxDaySelectHandler(index)}
                    $activeDay={maxdaySelect === index}
                  >
                    {day}
                  </SSelectDayBtn>
                );
              })}
            </SSelectProduct>
            <SFilterInputDay
              className="maxRentalDay"
              type="text"
              placeholder="숫자만 입력하세요."
              value={maxRentalDay}
              onChange={maxRentalDayHandler}
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
export default StoreWrite;

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
  align-items: flex-start;
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

const SFilterBoxGap20 = styled.div`
  display: flex;
  width: 320px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
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

const SFilterInput = styled.input`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid var(--border, #d9d9d9);
`;

const SFilterInputCost = styled.input`
  display: flex;
  width: 277px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--border, #d9d9d9);
  &::placeholder {
    color:#d9d9d9;
  }
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
    color:#d9d9d9;
  }
`;

const SFilterInFutAndWon = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const SCalendarDate = styled.div`
  display: flex;
  width: 800px;
  padding: 30px 20px;
  align-items: flex-start;
  gap: 30px;
  // justify-content: center;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
`;

const SPicture = styled.div`
  display: flex;
  width: 800px;
  padding: 30px 20px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
`;

const SLabel = styled.label`
  width: 138px;
  height: 101px;
  flex-shrink: 0;
`;

const SPictureList = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SInsertPicture = styled.img`
  height: 101px;
  border-radius: 10px;
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

const SSellContentInput = styled.input`
  color: #000;
  // text-align: center;
  font-size: 20px;
  font-weight: 700;
  width: 600px;
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
  z-index: 1;
  width: 143px;
  padding: 11px 16px;
  border-radius: 10px;
  top: 64px;
`;

const SDropdownMenuItem = styled.div`
  height: 41px;
  padding: 11px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
`;
