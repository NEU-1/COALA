import React, { useEffect, useState } from "react";
import { images } from "../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import ImgMediaCard from "./components/Carditem";
import TradeOfferForm from "./components/TradeOfferForm";

const AuctionDetail = () => {
  const [postData, setPostData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [currentProposalIndex, setCurrentProposalIndex] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);

  const navigate = useNavigate();
  const { postId } = useParams();
  const [data, setData] = useState(initialData());

  function initialData() {
    return [
      {
        id: 1,
        img: undefined,
        writer: "wilson",
        writeDay: "8/5",
        rentalFee: "80000",
        deposit: "3000",
        bargaining: false,
      },
      {
        id: 2,
        img: undefined,
        writer: "alice",
        writeDay: "8/4",
        rentalFee: "75000",
        deposit: "3500",
        bargaining: true,
      },
      {
        id: 3,
        img: undefined,
        writer: "bob",
        writeDay: "8/3",
        rentalFee: "81000",
        deposit: "2800",
        bargaining: false,
      },
      {
        id: 4,
        img: undefined,
        writer: "charlie",
        writeDay: "8/2",
        rentalFee: "83000",
        deposit: "3200",
        bargaining: true,
      },
      {
        id: 5,
        img: undefined,
        writer: "david",
        writeDay: "8/1",
        rentalFee: "85000",
        deposit: "3100",
        bargaining: false,
      },
      {
        id: 6,
        img: undefined,
        writer: "ella",
        writeDay: "7/31",
        rentalFee: "82000",
        deposit: "3300",
        bargaining: true,
      },
      {
        id: 7,
        img: undefined,
        writer: "frank",
        writeDay: "7/30",
        rentalFee: "84000",
        deposit: "2900",
        bargaining: false,
      },
      {
        id: 8,
        img: undefined,
        writer: "grace",
        writeDay: "7/29",
        rentalFee: "79000",
        deposit: "3400",
        bargaining: true,
      },
      {
        id: 9,
        img: undefined,
        writer: "harry",
        writeDay: "7/28",
        rentalFee: "77000",
        deposit: "3000",
        bargaining: false,
      },
      {
        id: 10,
        img: undefined,
        writer: "irene",
        writeDay: "7/27",
        rentalFee: "76000",
        deposit: "3050",
        bargaining: true,
      },
      {
        id: 11,
        img: undefined,
        writer: "jack",
        writeDay: "7/26",
        rentalFee: "78000",
        deposit: "3150",
        bargaining: false,
      },
      {
        id: 12,
        img: undefined,
        writer: "kelly",
        writeDay: "7/25",
        rentalFee: "80000",
        deposit: "3100",
        bargaining: true,
      },
      {
        id: 13,
        img: undefined,
        writer: "leo",
        writeDay: "7/24",
        rentalFee: "79000",
        deposit: "3200",
        bargaining: false,
      },
      {
        id: 14,
        img: undefined,
        writer: "mia",
        writeDay: "7/23",
        rentalFee: "77000",
        deposit: "3300",
        bargaining: true,
      },
      {
        id: 15,
        img: undefined,
        writer: "nick",
        writeDay: "7/22",
        rentalFee: "76000",
        deposit: "3400",
        bargaining: false,
      },
    ];
  }

  const isLogin = useSelector((state) => state.login.isLogin);
  const currentUser = "현재 로그인한 사용자 정보";
  const postAuthor = "게시글 작성자 정보";
  const isAuthor = currentUser === postAuthor;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse] = await Promise.all([
          axios.get(`your-server-url/posts/${postId}`),
        ]);
        setPostData(postResponse.data);
      } catch (error) {
        console.error("데이터를 가져오는데 실패:", error);
      }
    };
    fetchData();
  }, [postId]);
  const showProposalList = () => {
    setShowProposalModal(!showProposalModal);
  };

  const showDeleteModal = () => {
    setShowModal(true);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`your-server-url/posts/${postId}`);
      navigate("/auction");
    } catch (error) {
      console.error("포스트 삭제 오류:", error);
      alert("포스트 삭제에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const goProfile = () => {
    navigate("/profile");
  };
  const showForm = () => {
    // 나중에 로그인 여부 반대로
    if (!isLogin) {
      setShowFormModal(!showFormModal);
    } else {
      alert("로그인하세요");
      navigate("/login");
    }
  };
  const handleCardClick = (id) => {
    console.log(id);
    navigate(`${id}`);
  };

  const goUpdate = () => {
    if ("대기중") {
      navigate(`update`);
    }
  };
  const handleBackdropClick = () => {
    setShowModal(false);
  };
  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  const handlePictureChange = (direction) => {
    const totalProposal = data.length;
    if (direction === "next") {
      setCurrentProposalIndex((currentProposalIndex + 1) % totalProposal);
    } else {
      setCurrentProposalIndex(
        (currentProposalIndex - 1 + totalProposal) % totalProposal
      );
    }
  };

  return (
    <SMain>
      <SHeader>
        <STitleAndProduct>
          <SText>{"title"}삼성 민초 키보드 있으신분?</SText>
          <STextSub>
            ${"product"} / ${"day"}
          </STextSub>
        </STitleAndProduct>
        <SDayAndCost>
          <STextSmall>
            최소 ${"min"}일 / 최대 ${"max"}일
          </STextSmall>
          <STextSmall>
            ${"min"}원 / ${"max"}원
          </STextSmall>
        </SDayAndCost>
      </SHeader>
      <SContent>
        <SProfile onClick={goProfile}>
          <SProfileImg src={images.plus} alt="" />
          <STextSmall>{"작성자"}작성자</STextSmall>
        </SProfile>
        <STextSubSee>
          조회수 ${"see"} 관심 ${"like"}
        </STextSubSee>
      </SContent>
      <SContentDetail>
        <STextContent>{"content"} 진짜 없나?</STextContent>
      </SContentDetail>
      {isAuthor ? (
        <div>
        {showFormModal && (
          <SModalBackdrop onClick={showForm}>
            <SFormModal onClick={(e) => e.stopPropagation()}>
              <TradeOfferForm
                onClick={showForm}
                onClose = {() => setShowFormModal(false)}
              />
            </SFormModal>
          </SModalBackdrop>
        )}
        <SButtons>
          <SButtonWeekPurple onClick={showForm}>제안하기</SButtonWeekPurple>
        </SButtons>
        </div>
      ) : (
        <div>
          {showProposalModal && (
            <SModalBackdrop onClick={showProposalList}>
              <SCardModal onClick={(e) => e.stopPropagation()}>
                <SButtonArea
                  onClick={() => handlePictureChange("previous")}
                ></SButtonArea>
                <ImgMediaCard
                  img={data[currentProposalIndex].img}
                  writer={data[currentProposalIndex].writer}
                  writeDay={data[currentProposalIndex].writeDay}
                  rentalFee={data[currentProposalIndex].rentalFee}
                  deposit={data[currentProposalIndex].deposit}
                  bargaining={data[currentProposalIndex].bargaining}
                  onClick={() => handleCardClick(data[currentProposalIndex].id)}
                />
                <SButtonArea
                  onClick={() => handlePictureChange("next")}
                ></SButtonArea>
              </SCardModal>
            </SModalBackdrop>
          )}
          <SButtons>
            <SButtonSeeProposal onClick={showProposalList}>
              제안 확인
            </SButtonSeeProposal>
            <SButtonWeekPurple onClick={showDeleteModal}>
              삭제
            </SButtonWeekPurple>
            <SButtonPurple onClick={goUpdate}>수정</SButtonPurple>
          </SButtons>
        </div>
      )}
      {showModal && (
        <>
          <SModalBackdrop onClick={handleBackdropClick}>
            <SModal onClick={handleModalContentClick}>
              <STextContent>삭제</STextContent>
              <STextDelete>정말 삭제하시겠습니까?</STextDelete>
              <SButtonsDelete>
                <SButtonDelete onClick={handleDelete}>삭제</SButtonDelete>
                <SButtonBack onClick={handleCancel}>취소</SButtonBack>
              </SButtonsDelete>
            </SModal>
          </SModalBackdrop>
        </>
      )}
    </SMain>
  );
};

export default AuctionDetail;

const SMain = styled.div`
  margin-top: 170px;
  display: flex;
  // weight: 800px;
  // height: 1024px;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const SHeader = styled.div`
  display: flex;
  width: 800px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const SProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SProfileImg = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 84px;
`;

const SDayAndCost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;

const SText = styled.p`
  color: #000;
  font-size: 24px;
  font-weight: 700;
`;

const SContent = styled.div`
  display: flex;
  width: 800px;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--content-underline, #e9d5ff);
`;

const STitleAndProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const STextSub = styled.p`
  color: #a4a4a4;
  font-family: SF Pro Rounded;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SContentDetail = styled.div`
  display: flex;
  width: 800px;
  padding: 20px;
  align-items: center;
  gap: 10px;
`;

const STextContent = styled.p`
  color: #000;
  font-size: 20px;
  font-weight: 700;
`;

const STextSubSee = styled.p`
  color: #a4a4a4;
  font-family: SF Pro Rounded;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SButtons = styled.div`
  display: flex;
  width: 800px;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const SButtonWeekPurple = styled.button`
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

const SButtonPurple = styled.button`
  display: flex;
  width: 106px;
  height: 40px;
  padding: 10px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: #bd84fc;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.14px;
`;

const SButtonSeeProposal = styled.button`
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

const SModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 400px;
  height: 150px;
  padding: 30px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--confirm-border, #e9d5ff);
  background: var(--white, #fff);
  z-index: 10;
`;

const SModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const STextDelete = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 400;
`;

const SButtonsDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SButtonDelete = styled.button`
  display: flex;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--primary, #e9d5ff);
  color: var(--white, #fff);
  font-size: 12px;
  font-weight: 700;
`;

const SButtonBack = styled.button`
  display: flex;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--cancel, #d9d9d9);
  color: var(--white, #fff);
  font-size: 12px;
  font-weight: 700;
`;

const STextSmall = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const SCardModal = styled.div`
  display: flex;
  align-items: center;
  width: 66%;
  height: 100%;
  padding: 0 20px;
`;

const SButtonArea = styled.button`
  flex: 1;
  height: 100%;
`;

const SFormModal = styled.div`
align-items: center;
height: 100%;
padding: 0 20px;
position:fixed;
top: 10%;
`;