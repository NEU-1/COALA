
// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from "styled-components";
// import { Editor } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { requestPost, requestGet, setToken } from "../../../lib/api/api";

// function FreeCommentForm() {

//     const navigate = useNavigate();
  
//     const [board, setBoard] = useState({
//         author: '',
//         content: '',
//     });

//     const { author , content} = board;

//     const onChange = (event) => {
//     const { value, name } = event.target;
//     setBoard({
//       ...board,
//       [name]: value,
//       });
//     };
  
//   const saveBoard = async () => {
//     try {
//     setToken()
//       const params = {
//         author: board.author,
//         content: board.content,
//       }
 
//       // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
//       const response = await requestPost("comment/save", params);
      
//       console.log(response);
//       alert('등록되었습니다.');
//       navigate(`/free`);
//     } catch (error) {
//       console.error('게시글 등록 에러:', error);
//     } 
//   };

//         return(
//             <Slayout>
//                 <Writecontainer>
//                 <p>작성자:</p>
//                 <Textinput type="text" name="author" value={author} onChange={onChange} />
//                 <p>내용:</p>
//                 <Textinput type="text" name="content" value={content} onChange={onChange} />
//                 </Writecontainer>
//                 <SBtn onClick={saveBoard}>등록</SBtn >
//             </Slayout>
//         )
//     };
// export default FreeCommentForm;

// const Slayout = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     width: 800px;
//     margin-top: 20px;
//     border-top: 1px solid #BD84FC;
//     border-bottom: 1px solid #BD84FC;
//     padding-top: 10px;
//     padding-bottom: 10px;

// `
// const Writecontainer = styled.div`
//     display: flex;`

// const Textinput = styled.input`
//     font-size: 12px;
//     border: 1px black;
// `

// const SBtn = styled.div`
//   display: flex;
//   height: 30px;
//   width: 30px;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   border-radius: 7px;
//   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
//   background-color: ${(props) => (props.color ? props.color : '#d9d9d9')};
//   color: white;
//   cursor: pointer;
//   `

//   `

