import { useParams } from 'react-router-dom';
import axios from 'axios';
import { requestGet, setToken, requestPost, requestDelete } from '../../../lib/api/api';
import React,{useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components'
import { BiLike,BiSolidLike } from "react-icons/bi";
import { BsSend } from "react-icons/bs"
import { BsX } from "react-icons/bs"
import CCheckBox from '../../Common/CCheckBox';
import './Pagination.css';
import Pagination from "react-js-pagination";
import { images } from "../../../assets/images";




const FreeBoardDetail = () => {
  const { postid } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState();
  const navigate = useNavigate();
  const moveToUpdate = () => {
    navigate('/free/update/' + postid);
  };

  const [like, setlike] = useState(false);
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("현재 로그인한 사용자 정보");
  const [postAuthor, setPostAuthor] = useState("게시글 작성자 정보");
  const isAuthor = currentUser === postAuthor;

  
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
  const [anonymous, setAnonymous] = useState(false);
  const [maxpage, setMaxpage] = useState();
  const [activepage, setActivepage] = useState();
 

  const onChangeAnonymous = () => {
    setAnonymous(!anonymous);
    console.log(anonymous)
  };



  const getBoardList = () => {
    // const resp = await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)
    requestGet(`free/comment/${postid}/${page}`)
    .then(resp=>{console.log(resp.data.list);setPosts(resp.data.list)})
  }
  
  const handlePageChange = (page) => {
    setPage(page-1);
    setActivepage(page);
  };

  useEffect(() => {
    getBoardList()
    getBoard();
    setlike();
  }, []);

// 코멘트 작성 폼
const [commentboard, setcommentBoard] = useState({
  fpId: {
    "id": "int",
  },
  commentcontent: '',
  anonymous: false,
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
      content:commentboard.commentcontent,
      anonymous : anonymous,
    }
    // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
    const response = await requestPost(`free/comment/save/${postid}`, params);
    console.log(response);
    alert('등록되었습니다.');
    getBoardList()
  } catch (error) {
    console.error('댓글 등록 에러:', error);
    getBoardList()
  }
  
};

const commentDelete = async (commentId) => {
  if (window.confirm('게시글을 삭제하시겠습니까?')) {
    try {
      const resp = await axios.delete(`http://i9d108.p.ssafy.io:9999/api/free/comment/delete/${commentId}`);
      if (resp.status === 200) {
        alert('삭제되었습니다.');
        getBoardList()
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
    const likeres = await axios.post('http://i9d108.p.ssafy.io:9999/api/free/post/is/good', param);
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
    console.log('삭제');
  } catch (error) {
    console.error('에러:', error);
  }
};

  
  return (
      board && (<Slayout>
      <Container>
        <Profilebox>
        {board.memberId.imagePath ? (
            <SProfileImg src={board.memberId.imagePath} alt="" />
          ) : (
            <SProfileImg src={images.default_profile} alt="" />
          )}
        <Profiletext>{board.memberId.nickname}</Profiletext>
      
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
      {(board.mine ? (
            <SBtnContainer>
            <SBtn1 onClick={moveToUpdate}>수정</SBtn1>
            <SBtn2 onClick={deleteBoard}>삭제</SBtn2>
            </SBtnContainer> 
          ) : (
            <></>
          ))}
      
      <div>댓글{board.commentCount}</div>
        <CommentSlayout>
        <Writecontainer>
        <CCheckBoxcontainer>
          <CCheckBox
            text={'익명'}
            checked={anonymous}
            onChange={onChangeAnonymous}
          />
        </CCheckBoxcontainer>
        
          <CommentTextinput type="text" name="commentcontent" value={commentcontent} onChange={onChange} placeholder="  내용을 입력하세요." />
        </Writecontainer>
        <BsSend size={30} color='#e9d5ff' className='sendbtn' onClick={saveCommentBoard}></BsSend>
      </CommentSlayout>  
      

    <div>
      
      {/* {posts.slice(offset, offset + limit).map(({ id, title, detail, views, createAt,imagePath,memberId }) => ( */}
      {posts && posts.map(({ id, author , content, createAt,nickname,mine ,anonymous}) => (
        <Contentbox key={id}>
        <Commenttitlebox>
          <Minititlebox>
          {(anonymous ? (
          <Titletext2>익명</Titletext2>
        ) : ( <Titletext2>{nickname.length > 6 ? `${nickname.slice(0, 6)}...` : nickname}</Titletext2>
        ))}    
          
          <Numbertext>{createAt.slice(0,10)}</Numbertext>
          </Minititlebox>
        <Commentcontentbox>
          {content}
        </Commentcontentbox>
        </Commenttitlebox>
        <Subcommentupdatebox>
          {(mine ? (
            <BsX className='xbtn' onClick={() => commentDelete(id)}></BsX>
          ) : ( <div></div>
          ))}     
        </Subcommentupdatebox>   
      </Contentbox>
    ))}
      {posts.length > 0 && <Pagination
          activePage={activepage}
          itemsCountPerPage={5}
          totalItemsCount={maxpage*5}
          pageRangeDisplayed={maxpage}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />}
    </div>

  </Slayout>)
    
  );
};


export default FreeBoardDetail;

const Slayout = styled.div`
  margin-top: 170px;
  width: 800px;
  margin-bottom: 0;

  .sendbtn {
    margin-right: 20px;
    cursor: pointer;
  }
  .xbtn {
    cursor: pointer;
  }
`

const SBtn1 = styled.div`
  display: flex;
  width: 70px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background: #e9d5ff;
  color: white;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
  `

const SBtn2 = styled.div`
  display: flex;
  width: 70px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background: #BD84FC;
  color: white;
  text-align: center;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;`

const SBtnContainer = styled.div`
display: flex;
flex-direction: row;
align-items: end;
padding: 10px;
justify-content: end;
align-items: center;
gap: 10px;
padding-bottom: 20px;

`;
const Profiletext = styled.div`
  width: 800px;
  margin-bottom: 3px;
  font-size: 15px;
  padding-left: 15px;
  border: 1px;

`

const LIkeconteiner = styled.div`
  display: flex;
  font-size: 10px;
  padding: 10px;
`

const Detailconteiner = styled.div`
  margin-bottom: 200px;
  margin-left: 5px;
`
const Titlecontainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`
const Createat = styled.div`
  font-size: 10px;
  margin-left: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
`

const Contentbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e9d5ff;
  margin-bottom: 20px;
  height: 60px;
  width: 800px;
  margin-bottom: 0;
  padding: 3px;
`

const Numbertext = styled.div`
  margin-left: 3px;
  margin-right: 5px;
  font-size: 8px;
  color: gray;
`
const Titletext = styled.div`
  font-size: 30px;
  margin-left: 5px;
  `

const Count = styled.div`
  padding-right: 10px;
  font-size: 15px;
`

const Titletext2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  font-size: 14px;
  width: 100px;
  margin-left: 10px;
  display: flex;

`

const Container = styled.div`
  border-bottom: 1px solid #e9d5ff;
  margin-bottom: 30px;
`
const Like = styled.div`
  font-size: 15px
`

const CommentSlayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    margin-top: 20px;
    border-top: 1px solid #e9d5ff;
    border-bottom: 1px solid #e9d5ff;
    padding-top: 10px;
    padding-bottom: 10px;

`
const Writecontainer = styled.div`
      display: flex;
      align-items: start;
    `

const CommentTextinput = styled.input`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    font-size: 12px;
    height: 50px;
    width: 650px;
    border: 1px solid #d9d9d9;
`

  const Commenttitlebox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  `
  const Subcommentupdatebox = styled.div`
    display: flex;
  `

  const Commentcontentbox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    height: 100px;
    width: 700px;
    font-size: 14px;

  `
  const Profilebox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e9d5ff;
    padding-bottom: 10px;
  ` 

  const Minititlebox = styled.div`
    display: flex;
    align-items: end;
    width: 200px;

  `
  const CCheckBoxcontainer = styled.div`
    width: 70px;
    margin-left: 15px;
`

  const SProfileImg = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 84px;
`;