import React, { useEffect, useState } from "react";
import { images } from "../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

const StoreDetail = () => {
  const [postData, setPostData] = useState(null);
  const [pictures, setPictures] = useState([]); 
  const [pictureNum, setPictureNum] = useState(0);
  const [like, setLike] = useState(false);

  const navigate = useNavigate();
  const { postId } = useParams();
  
  const isLogin = useSelector(state => state.login.isLogin);
  const currentUser = "현재 로그인한 사용자 정보";
  const postAuthor = "게시글 작성자 정보";
  const isAuthor = currentUser === postAuthor;

  const [showModal, setShowModal] = useState(false);

   const handlePictureChange = (direction) => {
    const totalPictures = pictures.length;
    if (direction === 'next') {
      setPictureNum((pictureNum + 1) % totalPictures);
    } else {
      setPictureNum((pictureNum - 1 + totalPictures) % totalPictures);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [picturesResponse, postResponse] = await Promise.all([
          axios.get(`https://my-api.com/posts/${postId}/pictures`),
          axios.get(`your-server-url/posts/${postId}`),
        ]);
        setPictures(picturesResponse.data);
        setPostData(postResponse.data);
      } catch (error) {
        console.error('데이터를 가져오는데 실패:', error);
      }
    };
    fetchData();
  }, [postId]);

  const toggleLike = () => {
    setLike(!like);
  };
  const showDeleteModal = () => {
    setShowModal(true);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`your-server-url/posts/${postId}`);
      navigate("/store");
    } catch (error) {
      console.error('포스트 삭제 오류:', error);
      alert('포스트 삭제에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const goProfile = () => {
    navigate("/profile");
  };
  const goChat = () => {
    if (isLogin) {
      const chatId = `unique_chat_identifier`;
      navigate(`/chat/${chatId}`);
    } else {
      alert("로그인하세요");
      navigate("/login");
    }
  };
  
  const goUpdate = () => {
    if ("대기중") {
      navigate(`update`);
    }
  };
  const handleBackdropClick = (event) => {
    setShowModal(false);
  };
  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const updateFavouritePosts = async () => {
      try {
        if (like) {
          await axios.post(`your-server-url/favourites/${currentUser}`, { postId });
        } else {
          await axios.delete(`your-server-url/favourites/${currentUser}/${postId}`);
        }
      } catch (error) {
        console.error('Error updating favourite posts:', error);
      }
    };
    
    if (currentUser) {
      updateFavouritePosts();
    }
  }, [like, currentUser, postId]);
  

  return (
    <SMain>
      <SImgs>
        <button onClick={handlePictureChange}>{"<"}</button>
        {pictures.length > 0 && <SImg src={pictures[pictureNum]} alt="" />}
        <button onClick={handlePictureChange}>{">"}</button>
      </SImgs>
      <SHeader>
        <SProfile onClick={goProfile}>
          <SProfileImg src={images.plus} alt="" />
          <SText>{"작성자"}작성자</SText>
        </SProfile>
        <SDayAndCost>
          <SText>
            최소 ${"min"}일 / 최대 ${"max"}일
          </SText>
          <SText>
            ${"min"}원 / ${"max"}원
          </SText>
        </SDayAndCost>
      </SHeader>
      <SContent>
        <STitleAndProduct>
          <SText>{"title"}한성 무접점 키보드 대여합니다!~!</SText>
          <STextSub>
            ${"product"} / ${"day"}
          </STextSub>
        </STitleAndProduct>
        {!isAuthor &&
          (like ? (
            <img src={images.like} alt="React" onClick={toggleLike} />
          ) : (
            <img src={images.notlike} alt="React" onClick={toggleLike} />
          ))}
      </SContent>
      <SContentDetail>
        <STextContent>{"content"} 이걸 안씀? 길이 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트 길이 테스트</STextContent>
      </SContentDetail>
      <SFooter>
          <STextSubSee>
            조회수 ${"see"} 관심 ${"like"}
          </STextSubSee>
      </SFooter>
        {isAuthor ? (
          <SButtons>
            <SButtonWeekPurple onClick={goChat}>거래 요청</SButtonWeekPurple>
          </SButtons>
        ) : (
          <SButtons>
            <SButtonWeekPurple onClick={showDeleteModal}>삭제</SButtonWeekPurple>
            <SButtonPurple onClick={goUpdate}>수정</SButtonPurple>
          </SButtons>
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

export default StoreDetail;

const SMain = styled.div`
margin-top: 170px;
display: flex;
// weight: 800px;
// height: 1024px;
padding: 10px;
flex-direction: column;
align-items: center;
flex-shrink: 0;
`

const SImgs = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`

const SImg = styled.img`
width: 800px;
height: 372px;
`

const SHeader = styled.div`
display: flex;
width: 800px;
padding: 10px 20px;
gap: 10px;
border-bottom: 1px solid var(--content-underline, #E9D5FF);
justify-content: space-between;
align-items: center;
`

const SProfile = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`

const SProfileImg = styled.img`
width: 84px;
height: 84px;
border-radius: 84px;
`

const SDayAndCost = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
gap: 10px;
`

const SText = styled.p`
color: #000;
font-size: 16px;
font-weight: 700;
`

const SContent = styled.div`
display: flex;
width: 800px;
padding: 20px;
// align-items: center;
gap: 10px;
border-bottom: 1px solid var(--content-underline, #E9D5FF);
justify-content: space-between;
align-items: center;
`

const STitleAndProduct = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 8px;
`

const STextSub = styled.p`
color: #A4A4A4;
font-family: SF Pro Rounded;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const SContentDetail = styled.div`
display: flex;
width: 800px;
padding: 20px;
align-items: center;
gap: 10px;
`

const STextContent = styled.p`
color: #000;
font-size: 20px;
font-weight: 700;
`

const SFooter = styled.div`
display: flex;
width: 800px;
padding: 20px;
align-items: center;
gap: 10px;
border-bottom: 1px solid var(--content-underline, #E9D5FF);
`

const STextSubSee = styled.p`
color: #A4A4A4;
font-family: SF Pro Rounded;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const SButtons = styled.div`
display: flex;
width: 800px;
padding: 10px;
justify-content: flex-end;
align-items: center;
gap: 20px
`

const SButtonWeekPurple = styled.button`
display: flex;
width: 106px;
height: 40px;
padding: 10px 40px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 7px;
background: #E9D5FF;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: white;
text-align: center;
text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
font-size: 14px;
font-weight: 700;
letter-spacing: -0.14px;
`

const SButtonPurple = styled.button`
display: flex;
width: 106px;
height: 40px;
padding: 10px 40px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 7px;
background: #BD84FC;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: white;
text-align: center;
text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
font-size: 14px;
font-weight: 700;
letter-spacing: -0.14px;
`

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
  border: 1px solid var(--confirm-border, #E9D5FF);
  background: var(--white, #FFF);
  z-index: 10;
`;

const SModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // opacity: 0.8;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const STextDelete = styled.p`
color: #000;
font-size: 18px;
font-weight: 400;
`

const SButtonsDelete = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 8px;
`

const SButtonDelete = styled.button`
display: flex;
padding: 5px 20px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 5px;
background: var(--primary, #E9D5FF);
color: var(--white, #FFF);
font-size: 12px;
font-weight: 700;
`

const SButtonBack = styled.button`
display: flex;
padding: 5px 20px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 5px;
background: var(--cancel, #D9D9D9);
color: var(--white, #FFF);
font-size: 12px;
font-weight: 700;
`