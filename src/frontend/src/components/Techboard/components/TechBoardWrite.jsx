import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

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
  z-index: 0;
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

function TechBoardWrite(props) {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    email:'',
    title: '',
    detail: '',
    imagePath: 'String',
    isAnonymous: false,
  });

  const { title, detail } = board;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    try {
      // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
      const dataToSend = {
        ...board,
        email:'',
        title: '',
        detail: '',
        imagePath: 'String',
        isAnonymous: false,
      };

      await axios.post('http://i9d108.p.ssafy.io:9999/api/tech/post/save', dataToSend);
      alert('등록되었습니다.');
      navigate('/tech');
    } catch (error) {
      console.error('게시글 등록 에러:', error);
    }
  };

  const backToList = () => {
    navigate('/tech');
  };

  const editorRef = useRef();

  const handleRegisterButton = () => {
    // 에디터 내용을 얻어와서 변수에 저장
    const editorContent = editorRef.current?.getInstance().getMarkdown();

  };

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
        {/* <Editor
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
          
        /> */}
        <SBtn onClick={handleRegisterButton}>확인</SBtn>
      </div>
      <br />
      <SBtnContainer>
        <SBtn onClick={backToList}>취소</SBtn>
        <SBtn onClick={saveBoard}>등록</SBtn>
      </SBtnContainer>
    </Slayout>
  );
};

export default TechBoardWrite;






