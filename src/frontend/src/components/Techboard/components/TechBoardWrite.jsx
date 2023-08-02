import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

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
  ;
`

const Titletext = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
`
const Title = styled.div`
  margin-right: 10px;
  font-size: 30px;

`


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

    const { title } = board;
    
    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setBoard({
          ...board,
          [name]: value,
        });
      };
    
      const saveBoard = async () => {
        await axios.post(`localhost:9999/api/tech/post/`, board).then((res) => {
          alert('등록되었습니다.');
          navigate('/tech');
        });
      };
    
      const backToList = () => {
        navigate('/tech');
      };

      const editorRef = useRef();
  
      // 등록 버튼 핸들러
      const handleRegisterButton = () => {
      // 입력창에 입력한 내용을 HTML 태그 형태로 취득
      console.log(editorRef.current?.getInstance().getHTML());
      // 입력창에 입력한 내용을 MarkDown 형태로 취득
      console.log(editorRef.current?.getInstance().getMarkdown());
    };
  
    
      return (
        <Slayout>
          <div>
            <MainTitle >게시글 등록</MainTitle>
            <Titletext>
            <Title>제목</Title>
            <Textinput type="text" name="title" value={title} onChange={onChange} />
            </Titletext>  
          </div>
          <div>
            <h1> </h1>
              <Editor
                ref={editorRef} // DOM 선택용 useRef
                placeholder="내용을 입력해주세요."
                previewStyle="vertical" // 미리보기 스타일 지정
                height="500px" // 에디터 창 높이
                width="100%"
                initialEditType="wysiwyg" //
                toolbarItems={[
                  // 툴바 옵션 설정
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task', 'indent', 'outdent'],
                  ['table', 'image', 'link'],
                  ['code', 'codeblock']
                ]}
                useCommandShortcut={false} // 키보드 입력 컨트롤 방지
              ></Editor>
          </div>
          <br />
          <SBtnContainer>
            <SBtn onClick={backToList}>취소</SBtn>
            <SBtn onClick={handleRegisterButton}>등록</SBtn>
          </SBtnContainer>
        </Slayout>

      );
    };
    
    export default TechBoardWrite;