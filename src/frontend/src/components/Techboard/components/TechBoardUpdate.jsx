import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';

const TechBoardUpdate = () => {
  const navigate = useNavigate();
  const { idx } = useParams(); // /update/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState({
    idx: 0,
    title: '',
    createdBy: '',
    detail: '',
  });
  const editorRef = useRef();
  const { title,detail } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const getBoard = async () => {
    const resp = await (await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/detail/${idx}`)).data;
    setBoard(resp.data);
  };

  const updateBoard = async () => {
    await axios.patch(`http://i9d108.p.ssafy.io:9999/api/tech/update/${idx}`, board).then((res) => {
      alert('수정되었습니다.');
      navigate('/tech/' + idx);
    });
  };

  const backToDetail = () => {
    navigate('/tech/' + idx);
  };

  useEffect(() => {
    getBoard();
  }, []);
  const handleRegisterButton = () => {
    // 에디터 내용을 얻어와서 변수에 저장
    const detail = editorRef.current?.getInstance().getMarkdown();
  }
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
        <Editor
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
        <SBtn onClick={handleRegisterButton}>확인</SBtn>
      </div>
      <br />
      <SBtnContainer>
        <SBtn onClick={backToDetail}>취소</SBtn>
        <SBtn onClick={updateBoard}>수정</SBtn>
      </SBtnContainer>
    </Slayout>
  );
};

export default TechBoardUpdate;

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