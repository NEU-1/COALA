import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
// import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { requestPost, requestGet, setToken } from "../../../lib/api/api";


const SBtn = styled.div`
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

const Slayout = styled.div`
  margin-top: 170px;
  width: 800px;
`

const Textinput = styled.input`
  font-size: 20px;
`

const SBtnContainer = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 100px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 20px;
`;

const Titletext = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
`

const Title = styled.div`
  margin-right: 10px;
  font-size: 30px;
`


function TechBoardWrite() {
  const navigate = useNavigate();
  


  const [board, setBoard] = useState({
    title: '',
    detail: '',
    imagePath: 'String',
    isAnonymous: false,
  });

  const { memberId, title, detail } = board;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };
  


  const saveBoard = async () => {
    try {
      const editorContent = editorRef.current?.getInstance().getMarkdown();
      const editorContent2 = editorRef.current?.getInstance().getHTML();
  
      // 저장하고자 하는 내용을 board 객체에 추가
      setBoard({
        ...board,
        detail: editorContent,editorContent2
      });
  
      const params = {
        title: board.title,
        detail: editorContent, // 수정된 부분: editorContent를 사용
        imagePath: board.imagePath,
        isAnonymous: board.isAnonymous,
      }
  
      // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
      const response = await requestPost("tech/post/save", params);
      
      console.log(response);
      alert('등록되었습니다.');
      navigate(`/tech`);
    } catch (error) {
      console.error('게시글 등록 에러:', error);
    } 
  };

  const backToList = () => {
    navigate('/tech');
  };

  const editorRef = useRef();

  
  return (
    <Slayout>
      <div>
        <MainTitle>게시글 등록</MainTitle>
        <Titletext>
          <Title>제목</Title>
          <Textinput type="text" name="title" value={title} onChange={onChange} />
        </Titletext>
      </div>
      <div>
        {<Editor
          ref={editorRef}
          placeholder="내용을 입력해주세요."
          previewStyle="vertical"
          height="500px"
          width="100%"
          initialEditType="wysiwyg"
          language="ko-KR"
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock']
          ]}
          useCommandShortcut={false}
        />
}
      </div>
      <br />
      <SBtnContainer>
        <SBtn onClick={backToList}>취소</SBtn>
        <SBtn onClick={saveBoard}>등록</SBtn>
      </SBtnContainer>

    </Slayout>
  );
}

export default TechBoardWrite;