import React, { useEffect, useState } from "react";
import { images } from "../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ImgMediaCard from "./components/Carditem";
import TradeOfferForm from "./components/TradeOfferForm";
import { requestGet, requestDel, setToken } from "../../lib/api/api";
import { login } from "../../store/LoginSlice";

const AuctionDetail = () => {
  console.log("렌더링");
  const [showModal, setShowModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [currentProposalIndex, setCurrentProposalIndex] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const [postData, setPostData] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    setToken();
    console.log("렌더링2");
    requestGet(`auction/detail?id=${postId}`)
      .then((res) => {
        setPostData(res.data);
        setIsAuthor(res.data.mine);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (postData) {
      setIsAuthor(postData.mine);
    }
  }, []);

  const isLogin = login;

  const showProposalList = () => {
    if (postData.auctionApplies.length === 0) {
      alert("제안이 없습니다.");
      return;
    }
    setShowProposalModal(!showProposalModal);
  };

  const showDeleteModal = () => {
    setShowModal(true);
  };
  const handleDelete = async () => {
    setToken();
    requestDel(`auction/delete?id=${postId}`)
      .then((res) => {
        console.log(res);
        console.log("삭제됨");
        navigate("/auction");
      })
      .catch((err) => {
        console.error(err);
        console.log("본인 글만 삭제 가능");
      });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const goProfile = () => {
    navigate("/profile");
  };
  const showForm = () => {
    if (isLogin) {
      setShowFormModal(!showFormModal);
    } else {
      alert("로그인하세요");
      navigate("/login");
    }
  };

  const goUpdate = () => {
    requestGet(`auction/valid?id=${postId}`)
      .then((res) => {
        if (res.status === 200) {
          navigate(`update`);
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("본인글만 수정 가능");
      });
  };
  const handleBackdropClick = () => {
    setShowModal(false);
  };
  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const displayDate = postData
    ? formattedDate(postData.auctionPost.createdAt)
    : "";

  const handlePictureChange = (direction) => {
    const totalProposal = postData.auctionApplies.length;
    if (direction === "next") {
      setCurrentProposalIndex((currentProposalIndex + 1) % totalProposal);
    } else {
      setCurrentProposalIndex(
        (currentProposalIndex - 1 + totalProposal) % totalProposal
      );
    }
  };
  console.log(isAuthor);

  return (
    <SMain>
      {postData ? (
        <>
          <SContent>
            <SProfile onClick={goProfile}>
              <SProfileImg src={images.plus} alt="" />
              <STextSmall>{postData.auctionPost.author}</STextSmall>
            </SProfile>
            <SDayAndCost>
              <STextSub>{displayDate}</STextSub>
              <STextSub>
                {postData.auctionPost.category.name} / 최소{" "}
                {postData.auctionPost.minRentalPeriod}일
              </STextSub>
            </SDayAndCost>
          </SContent>
          <SHeader>
            <STitleAndProduct>
              <SText>{postData.auctionPost.title}</SText>
            </STitleAndProduct>
          </SHeader>

          <SContentDetail>
            <STextMainContent>{postData.auctionPost.detail}</STextMainContent>
          </SContentDetail>

          {!isAuthor ? (
            <div>
              {showFormModal && (
                <SModalBackdrop onClick={showForm}>
                  <SFormModal onClick={(e) => e.stopPropagation()}>
                    <TradeOfferForm
                      onClick={showForm}
                      onClose={() => setShowFormModal(false)}
                    />
                  </SFormModal>
                </SModalBackdrop>
              )}{" "}
              <STextSub>조회수 {postData.auctionPost.views}</STextSub>
              <SButtons>
                <SButtonWeekPurple onClick={showForm}>
                  제안하기
                </SButtonWeekPurple>
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
                      img={
                        postData.auctionApplies[currentProposalIndex]
                          .auctionImageList
                      }
                      proposerId={
                        postData.auctionApplies[currentProposalIndex].memberId
                      }
                      postId={postId}
                      title={
                        postData.auctionApplies[currentProposalIndex]
                          .auctionApply.title
                      }
                      mainText={
                        postData.auctionApplies[currentProposalIndex]
                          .auctionApply.detail
                      }
                      rentalFee={
                        postData.auctionApplies[currentProposalIndex]
                          .auctionApply.rentalCost
                      }
                      deposit={
                        postData.auctionApplies[currentProposalIndex]
                          .auctionApply.deposit
                      }
                      bargaining={
                        postData.auctionApplies[currentProposalIndex]
                          .auctionApply.negotiation
                      }
                    />
                    <SButtonArea
                      onClick={() => handlePictureChange("next")}
                    ></SButtonArea>
                  </SCardModal>
                </SModalBackdrop>
              )}{" "}
              <STextSub>조회수 {postData.auctionPost.views}</STextSub>
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
        </>
      ) : null}
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
  border-bottom: 1px solid silver;
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

const STextMainContent = styled.p`
  color: #000;
  font-size: 20px;
  font-weight: 500;
  white-space: pre-wrap;
  min-height: 200px;
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
  position: fixed;
  display: flex;
`;