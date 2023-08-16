import { useParams } from 'react-router-dom';
import axios from 'axios';
import { requestGet, setToken, requestPost, requestDelete } from '../../../lib/api/api';
import React,{useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
// import CCheckBox from '../Common/CCheckBox';




const FreeBoardDetail = () => {
  const { postid } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState();
  const navigate = useNavigate();
  const moveToUpdate = () => {
    navigate('/free/update/' + postid);
  };
  const [postData, setPostData] = useState();
  const [pictures, setPictures] = useState([]); 
  const [pictureNum, setPictureNum] = useState(0);
  const [like, setlike] = useState(false);
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("현재 로그인한 사용자 정보");
  const [postAuthor, setPostAuthor] = useState("게시글 작성자 정보");
  const isAuthor = currentUser === postAuthor;
  const [showModal, setShowModal] = useState(false);
  const picturePlusBtn = () => {
    setPictureNum((pictureNum + 1) % "사진수");
  };
  const pictureMinusBtn = () => {
    setPictureNum((pictureNum + "사진수" - 1) % "사진수");
  };
  
  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const resp = await axios.delete(`http://i9d108.p.ssafy.io:9999/api/free/post/delete/${postid}`);
        if (resp.status === 200) {
          alert('삭제되었습니다.');
          navigate('/free');
        }
      } catch (error) {
        console.error("Error deleting board:", error);
      } 
    }
  };

  
  const getBoard = () => {
    setToken()
    // const resp = await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)
    requestGet(`free/post/detail/${postid}`)
    .then(res=>{console.log(res.data);setBoard(res.data)})
  }

  const moveToList = () => {
    navigate('/free');
  };

  
  // 코멘트 리스트


  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);


  const getBoardList = () => {
    // const resp = await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)
    requestGet(`free/comment/${postid}/${page}`)
    .then(resp=>{console.log(resp.data);setPosts(resp.data.list)})
   
  }

  useEffect(() => {
    getBoardList() // 1) 게시글 목록 조회 함수 호출
    getBoard();
    setlike();
  }, []);

// 코멘트 작성 폼
const [commentboard, setcommentBoard] = useState({
  fpId: {
    "id": "int",
  },
  author: '',
  commentcontent: '',
});

const { author , commentcontent} = commentboard;

const onChange = (event) => {
const { value, name } = event.target;
setcommentBoard({
...commentboard,
[name]: value,
});
};

const saveCommentBoard = async () => {
  try {

    const params = {
      fpId: {
        "id": Number(postid),       
    },
      author: commentboard.author,
      content:commentboard.commentcontent,
    }
    // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
    const response = await requestPost(`free/comment/save/${postid}`, params);
    console.log(response);
    alert('등록되었습니다.');
    navigate(`/free/post/detail/${postid}`);
  } catch (error) {
    console.error('댓글 등록 에러:', error);
    navigate(`/free/post/detail/${postid}`)
  }
  
};

const commentDelete = async (commentId) => {
  if (window.confirm('게시글을 삭제하시겠습니까?')) {
    try {
      const resp = await axios.delete(`http://i9d108.p.ssafy.io:9999/api/free/comment/delete/${commentId}`);
      if (resp.status === 200) {
        alert('삭제되었습니다.');
        navigate(`/free/post/detail/${postid}`);
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    } 
  }
};

const likeBtn = async() => {
  const param = {
    fpId: {
      "id": Number(postid)     
  },
} 
try {
  console.log(param)
    const likeres = await axios.post('http://i9d108.p.ssafy.io:9999/api/free/post/is/good', { data: param });
    setlike(true);
    console.log(like)
    console.log('성공')
  
} catch (error) {
  console.error('에러:', error);
}
};
const unlikeBtn = async() => {
  const param2 = {
    fpId: {
      "id": Number(postid)     
    },
  };

  try {
    const unlikeres = await axios.delete('http://i9d108.p.ssafy.io:9999/api/free/post/un/good', { data: param2 });
    setlike(false);
    console.log(like);
    console.log('실패');
  } catch (error) {
    console.error('에러:', error);
  }
};

  
  return (
      board && (<Slayout>
      <Container>
      <Profiletext>작성자</Profiletext>
        <Titlecontainer>
       <div>
       <Titletext>{board.title}</Titletext>
        <Createat>{board.createAt && board.createAt.slice(0,10)}</Createat>
       </div>
       {(like ? (
            <BiSolidLike size={40} onClick={unlikeBtn}/>
          ) : (
            <BiLike size={40} onClick={likeBtn}/>
          ))}
       </Titlecontainer>
      <hr />
     <Detailconteiner>
      <Viewer initialValue={board.detail} />

      </Detailconteiner>
      <LIkeconteiner>
        <Count>조회수{board.views}</Count>
        <Like>좋아요{board.goodCount}</Like>
        </LIkeconteiner>
      </Container>
        <div>댓글</div>
        <CommentSlayout>
        <Writecontainer>
        <p>작성자:</p>
        <CommentTextinput type="text" name="author" value={author} onChange={onChange} />
        <p>내용:</p>
        <CommentTextinput type="text" name="commentcontent" value={commentcontent} onChange={onChange} />
      </Writecontainer>
        <SBtn onClick={saveCommentBoard}>등록</SBtn>
      </CommentSlayout>  
      

    <div>
      
      {/* {posts.slice(offset, offset + limit).map(({ id, title, detail, views, createAt,imagePath,memberId }) => ( */}
      {posts && posts.map(({ id, author , content, createAt,}) => (
        <Contentbox key={id}>
          <Commenttitlebox>
          {/* <CCheckBox
              text={'동의'}
              checked={isAgree1}
              onChange={onChangeAgree1}
            /> */}
            <Titletext2>
              {author}
            </Titletext2>
            <Userbox>
              <Numbertext>{createAt.slice(0,10)}</Numbertext>
            </Userbox>
          </Commenttitlebox>
            {content}
            <Subcommentupdatebox>
            <SBtn>
              수정
            </SBtn>
            <SBtn onClick={() => commentDelete(id)}>삭제</SBtn>
            
            </Subcommentupdatebox>
        
        </Contentbox>
      ))}
      <SBtnContainer>
        <SBtn1 onClick={moveToUpdate}>수정</SBtn1>
        <SBtn2 onClick={deleteBoard}>삭제</SBtn2>
        <SBtn3 onClick={moveToList}>뒤로가기</SBtn3>
      </SBtnContainer> 
    </div>

  </Slayout>)
    
  );
};


export default FreeBoardDetail;

const Slayout = styled.div`
  margin-top: 170px;
  width: 800px;
  margin-bottom: 0;
`

const SBtn1 = styled.div`
  font-size: 8px;
  display: flex;
  height: 50px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  background-color: #E9D5FF;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;`

const SBtn2 = styled.div`
  font-size: 8px;
  display: flex;
  height: 50px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  background-color: #BD84FC;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;`

const SBtn3 = styled.div`
  font-size: 8px;
  display: flex;
  height: 50px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;`

const SBtnContainer = styled.div`
display: flex;
flex-direction: row;
align-items: end;
padding: 10px;
margin-bottom: 100px;
justify-content: end;
align-items: center;
gap: 10px;
padding-bottom: 20px;

`;

const Profiletext = styled.div`
  
  width: 800px;
  margin-bottom: 3px;
  font-size: 15px;
  border-bottom: 1px solid #BD84FC;
  padding-bottom: 15px;

`

const LIkeconteiner = styled.div`
  display: flex;
  font-size: 10px;
  margin-bottom: 10px;
`

const Detailconteiner = styled.div`
  margin-bottom: 200px;
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
const Titlecontainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Createat = styled.div`
  font-size: 10px;
  margin-left: 10px;
`

const Contentbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid #BD84FC;
  border-bottom: 1px solid #BD84FC;
  margin-bottom: 20px;
  border-radius: 3%;
  width: 800px;
`

const Userbox = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 5px;
`
const Usertext = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 13px;
`
const Numbertext = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 13px;
  margin-top: 3px;
`
const Titletext = styled.div`
  font-size: 30px;
  margin-left: 5px;
  margin-bottom: 3px;
`

const Count = styled.div`
  padding-right: 10px;
  font-size: 15px;
`

const Titletext2 = styled.div`
  font-size: 30px;
  margin-left: 5px;
`

const Container = styled.div`
  border-bottom: 1px solid #BD84FC;
  margin-bottom: 50px;
`
const Like = styled.div`
  font-size: 15px
`

const CommentSlayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 800px;
    margin-top: 20px;
    border-top: 1px solid #BD84FC;
    border-bottom: 1px solid #BD84FC;
    padding-top: 10px;
    padding-bottom: 10px;

`
const Writecontainer = styled.div`
    display: flex;`

const CommentTextinput = styled.input`
    font-size: 12px;
    border: 1px black;
`

const SBtn = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.color ? props.color : '#d9d9d9')};
  color: white;
  cursor: pointer;
  `

  const Textinput = styled.input`
    font-size: 12px;
    border: 1px black;
`

const Commenttitlebox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `
  const Subcommentupdatebox = styled.div`
    display: flex;
  `