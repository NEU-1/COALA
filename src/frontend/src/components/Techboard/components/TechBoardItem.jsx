import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const TechBoardItem = ({ idx, title, contents, createdBy }) => {
  const navigate = useNavigate();

  const moveToUpdate = () => {
    navigate('/update/' + idx);
  };

  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await axios.delete(`http://i9d108.p.ssafy.io:9999/api/tech/post/${idx}`).then((res) => {
        alert('삭제되었습니다.');
        navigate('/tech');
      });
    }
  };

  const moveToList = () => {
    navigate('/tech');
  };

  return (
    <div>
      <Viewer 
      initialValue={contents}
    />
      <div>
        <h2>{title}</h2>
        <h5>{createdBy}</h5>
        <hr />
        <p>{contents}</p>
        <p>조회수</p>
        <p>작성자</p>
        <p>사진</p>
      </div>
      <div>
        <button onClick={moveToUpdate}>수정</button>
        {/* <button onClick={deleteBoard}>삭제</button> */}
        <button onClick={moveToList}>뒤로가기</button>
        <button onClick={deleteBoard}>삭제</button>
      </div>
    </div>
  );
};

export default TechBoardItem ;