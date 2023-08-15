import { useParams } from 'react-router-dom';
import axios from 'axios';
import { requestGet, setToken, requestPost, requestDelete, requestPut } from '../../../lib/api/api';
import React,{useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import Modal from 'react-modal'





const TechBoardDetail = () => {
  const { postid } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState();
  const navigate = useNavigate();
  const [Imagepath,setPath] = useState()
  const moveToUpdate = () => {
    navigate('/tech/update/' + postid);
  };
  const [postData, setPostData] = useState();
  const [pictureNum, setPictureNum] = useState(0);
  const [like, setlike] = useState(false);
  const [currentUser, setCurrentUser] = useState("현재 로그인한 사용자 정보");
  const [postAuthor, setPostAuthor] = useState("게시글 작성자 정보");
  const isAuthor = currentUser === postAuthor;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const resp = await axios.delete(`http://i9d108.p.ssafy.io:9999/api/tech/post/delete/${postid}`);
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
    requestGet(`tech/post/detail/${postid}`)
    .then(res=>{
      console.log(res.data);
      setBoard(res.data);
      console.log(res.data.good)
      if (res.data.good === true) {     
        setlike(true)
      } else {
        setlike(false)
      }
       
    })
    
  }
  
  const likeBtn = async() => {
    const param = {
      tpId: {
        "id": Number(postid)     
    },
  }
    console.log(param)
      const likeres = await axios.post('http://i9d108.p.ssafy.io:9999/api/tech/post/is/good', param)
      setlike(true);
      console.log(like)
      console.log('성공')

  }
  const unlikeBtn = async() => {
    const param2 = {
      tpId: {
        "id": Number(postid)     
      },
    };
  
    try {
      const unlikeres = await axios.delete('http://i9d108.p.ssafy.io:9999/api/tech/post/un/good', { data: param2 });
      setlike(false);
      console.log(like);
      console.log('실패');
    } catch (error) {
      console.error('에러:', error);
    }
  };
    

  const moveToList = () => {
    navigate('/tech');
  };

  
  // 코멘트 리스트


  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  


  const getBoardList = () => {
    // const resp = await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)
    requestGet(`tech/comment/${postid}/${page}`)
    .then(resp=>{console.log(resp.data);setPosts(resp.data.list)})
    setcommentBoard({...commentboard, author: '', commentcontent: ''});
  }

  useEffect(() => {
    getBoardList() // 1) 게시글 목록 조회 함수 호출
    getBoard();
    setlike();
  }, []);

// 코멘트 작성 폼

const [commentboard, setcommentBoard] = useState({
  tpId: {
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
      tpId: {
        "id": Number(postid),       
    },
      author: commentboard.author,
      content:commentboard.commentcontent,
    }
    // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
    const response = await requestPost(`tech/comment/save/${postid}`, params);
    console.log(response);
    alert('등록되었습니다.');
    getBoardList();
    
    
  } catch (error) {
    console.error('댓글 등록 에러:', error);
    getBoardList();
  }
  
};

  

const commentDelete = async (commentId) => {
  if (window.confirm('게시글을 삭제하시겠습니까?')) {
    try {
      const resp = await axios.delete(`http://i9d108.p.ssafy.io:9999/api/tech/comment/delete/${commentId}`);
      if (resp.status === 200) {
        alert('삭제되었습니다.');
        getBoardList();
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    } 
  }
};

  
  return (
      board && (<Slayout>
      <Container>
      <Profilebox>
      <div>image</div>
      <Profiletext>작성자</Profiletext>
      
      </Profilebox>
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
        <div>댓글{board.commentCount}</div>
        <CommentSlayout>
        <Writecontainer>
        <p>작성자:</p>
        <CommentTextinput type="text" name="author" value={author} onChange={onChange}/>
        <CommentTextinput type="text" name="commentcontent" value={commentcontent} onChange={onChange} />
      </Writecontainer>
        <SBtn onClick={saveCommentBoard}>등록</SBtn>
      </CommentSlayout>  
    <div>
      
      {/* {posts.slice(offset, offset + limit).map(({ id, title, detail, views, createAt,imagePath,memberId }) => ( */}
      {posts && posts.map(({ id, author , content, createAt,nickname,mine}) => (
        <Contentbox key={id}>
          <Commenttitlebox>
            <Minititlebox>
            <Titletext2>{nickname}</Titletext2>
            <Numbertext>{createAt.slice(0,10)}</Numbertext>
            </Minititlebox>
          <Commentcontentbox>
            {content}
          </Commentcontentbox>
          </Commenttitlebox>
          <Subcommentupdatebox>
          {(mine ? (
            <SBtn onClick={() => commentDelete(id)}>삭제</SBtn>
          ) : ( <div></div>
          ))}     
          </Subcommentupdatebox>   
        </Contentbox>
      ))}
      
      
        {(board.mine ? (
            <SBtnContainer>
            <SBtn1 onClick={moveToUpdate}>수정</SBtn1>
            <SBtn2 onClick={deleteBoard}>삭제</SBtn2>
            <SBtn3 onClick={moveToList}>뒤로가기</SBtn3>
            </SBtnContainer> 
          ) : (
            <SBtnContainer>
            <SBtn3 onClick={moveToList}>뒤로가기</SBtn3>
            </SBtnContainer>
          ))}
        
      
    </div>

  </Slayout>)
    
  );
};


export default TechBoardDetail;

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
  padding-bottom: 15px;

`

const LIkeconteiner = styled.div`
  display: flex;
  font-size: 10px;
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
  border-bottom: 1px solid #BD84FC;
  margin-bottom: 20px;
  width: 800px;
  margin-bottom: 0;
  padding: 3px;
`

const Numbertext = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 8px;
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
  font-size: 15px;
  margin-left: 10px;
  width: 80px;
  display: flex;
  justify-content: center;
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
  width: 40px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
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
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `
  const Subcommentupdatebox = styled.div`
    display: flex;
  `

  const Commentcontentbox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    font-size: 15px;

  `
  const Profilebox = styled.div`
    display: flex;
    border-bottom: 1px solid #BD84FC;
  ` 

  const Minititlebox = styled.div`
    display: flex;
    align-items: end;
  `