import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Commentapp from './Commentapp';
import { requestGet, requestPost ,setToken } from '../../../lib/api/api';
import styled from 'styled-components';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { BiLike } from "react-icons/bi";



const TechBoardDetail = () => {
  const { postid } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState({});
  const [postData, setPostData] = useState(null);
  const [pictures, setPictures] = useState([]); 
  const [pictureNum, setPictureNum] = useState(0);
  const [like, setlike] = useState(false);
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("현재 로그인한 사용자 정보");
  const [postAuthor, setPostAuthor] = useState("게시글 작성자 정보");
  const isAuthor = currentUser === postAuthor;
  const [showModal, setShowModal] = useState(false);

  const getBoard = () => {
    // const resp = await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)
    setToken()
    const resp = requestGet(`tech/post/detail/${postid}`)
    .then((res)=>{
      console.log("skskskks",res)
      setBoard(res.data)
    })
    console.log("확인",resp)
    setBoard(resp.data);
    return resp.data
  }
  useEffect(() => {
    getBoard();
  }, []);

  const navigate = useNavigate();

  const moveToUpdate = () => {
    navigate('/tech/update/' + postid);
  };
  
  const picturePlusBtn = () => {
    setPictureNum((pictureNum + 1) % "사진수");
  };
  const pictureMinusBtn = () => {
    setPictureNum((pictureNum + "사진수" - 1) % "사진수");
  };
  const likeBtn = () => {
    setlike(!like);
  };

  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(`http://i9d108.p.ssafy.io:9999/api/tech/post/delete/${postid}`);
        if (response.status === 200) {
          alert('삭제되었습니다.');
          navigate('/tech');
        }
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    }
  };

  const moveToList = () => {
    navigate('/tech');
  };


  return (
    <Slayout>
      
      <div>
        <Profiletext>작성자</Profiletext>
        <Titlecontainer>
        <div>
        <Titletext>{board.title}</Titletext>
        <Createat>{board.createAt && board.createAt.slice(0,10)}</Createat>
        </div>
        <BiLike onClick={likeBtn}/>
        </Titlecontainer>
        <hr />
        <Detailconteiner>
        {/* <button onClick={pictureMinusBtn}>{"<"}</button>
        {pictures.length > 0 && <SImg src={pictures[pictureNum]} alt="" />}
        <button onClick={picturePlusBtn}>{">"}</button> */}
        <Viewer initialValue={board.detail} />

        </Detailconteiner>
        <LIkeconteiner>
        <p>조회수0</p>
        <p></p>
        <p>추천수0</p>
        </LIkeconteiner>
      </div>
      <SBtnContainer>
        <SBtn onClick={moveToUpdate}>수정</SBtn>
        <SBtn onClick={deleteBoard}>삭제</SBtn>
        <SBtn onClick={moveToList}>뒤로가기</SBtn>

      </SBtnContainer>
      <Commentapp />
    </Slayout>
  );
};


export default TechBoardDetail;

const Slayout = styled.div`
  margin-top: 170px;
  width: 800px;
`

const SBtn = styled.div`
  font-size: 8px;
  display: flex;
  height: 50px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.color ? props.color : '#d9d9d9')};
  color: white;
  cursor: pointer;`

const SBtnContainer = styled.div`
display: flex;
padding: 10px;
margin-bottom: 100px;
justify-content: center;
align-items: center;
gap: 10px;
`;

const Profiletext = styled.div`
  
  width: 800px;
  margin-bottom: 3px;
  font-size: 12px;
  border-bottom: 1px solid #f5a4a4;

`

const LIkeconteiner = styled.div`
  display: flex;
  font-size: 10px;
`

const Detailconteiner = styled.div`

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
const Titletext = styled.div`
  font-size: 20px;
  margin-bottom: 3px;
`
const Titlecontainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Createat = styled.div`
  font-size: 10px;`