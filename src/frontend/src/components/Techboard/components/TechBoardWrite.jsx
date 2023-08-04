import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
// import TextInput from './TextInput';
// import Button from './Button';
import axios from 'axios';

// const NoSsrEditor = dynamic(() => import('components/TuiEditor'), {
//     ssr: false,
//   });

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child){
            magin-bottom: 16px;
        }
    };
`;

function TechBoardWrite(props){
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        contents: '',
      });

    const { title, createdBy, contents } = board;
    
    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setBoard({
          ...board,
          [name]: value,
        });
      };
    
      const saveBoard = async () => {
        await axios.post(`//localhost:8080/board`, board).then((res) => {
          alert('등록되었습니다.');
          navigate('/tech');
        });
      };
    
      const backToList = () => {
        navigate('/tech');
      };
    
      return (
        <div>
          <div>
            <span>제목</span>
            <input type="text" name="title" value={title} onChange={onChange} />
          </div>
          <br />
          <div>
            <span>작성자</span>
            <input
              type="text"
              name="createdBy"
              value={createdBy}
              onChange={onChange}
            />
          </div>
          <br />
          <div>
            <span>내용</span>
            <textarea
              name="contents"
              cols="30"
              rows="10"
              value={contents}
              onChange={onChange}
            ></textarea>
          </div>
          <br />
          <div>
            <button onClick={saveBoard}>저장</button>
            <button onClick={backToList}>취소</button>
          </div>
        </div>
      );
    };
    
    export default TechBoardWrite;