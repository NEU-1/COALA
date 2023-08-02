import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";

const Slayout = styled.div`
  margin-top: 170px;
`
const Button = styled.div`
  display: flex;
  height: 50px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.color ? props.color : '#d9d9d9')};
  color: white;
  cursor: pointer;
`


const TechBoardList = () => {
  const navigate = useNavigate();

  const [boardList, setBoardList] = useState([]);
  

  const getBoardList = async () => {
    // const resp = await (await axios.get('//localhost:8080/board')).data; // 2) 게시글 목록 데이터에 할당
    // setBoardList(resp.data); // 3) boardList 변수에 할당

    // const pngn = resp.pagination;
    // console.log(pngn);
  }
  const goTowrite = () => {
    navigate('/tech/write');
  };

  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
  }, []);

  return (
    <Slayout>
      
      <div>
        <ul>
          {boardList.map((board) => (
            // 4) map 함수로 데이터 출력
            <li>
            <Link to={`/board/${board.idx}`}>{board.user}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={goTowrite}>게시글 등록하기</Button>
    </Slayout>
  );
};

export default TechBoardList;