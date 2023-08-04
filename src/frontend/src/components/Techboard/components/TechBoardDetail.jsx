import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TechBoardItem from './TechBoardItem';


const TechBoardDetail = () => {
  const { idx } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const getBoard = async () => {
    const resp = await (await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/detail${idx}`)).data;
    setBoard(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);

  

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <TechBoardItem
          idx={board.idx}
          title={board.title}
          contents={board.contents}
          createdBy={board.createdBy}
        />
      )}
    </div>
  );
};


export default TechBoardDetail;