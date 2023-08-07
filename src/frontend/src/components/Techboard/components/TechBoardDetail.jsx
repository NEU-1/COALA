import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TechBoardItem from './TechBoardItem';
import Commentapp from './Commentapp';
import { requestGet, setToken } from '../../../lib/api/api';



const TechBoardDetail = () => {
  const { postid } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState({});
  console.log(postid)
  const getBoard = () => {
    // const resp = await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)
    // setToken()
    const resp = requestGet(`tech/post/detail/${postid}`)
    console.log("확인",resp)
    setBoard(resp.data);
    return resp.data
  }
  useEffect(() => {
    getBoard();
  }, []);

  
  return (
    <div>
      {/* {board.id} */}
      <TechBoardItem
        idx={board.id}
        title={board.title}
        contents={board.contents}
        createdBy={board.createAt}
        />
      <Commentapp />
    </div>

      

  );
};


export default TechBoardDetail;