import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import Pagination from "./Pagination";




const TechBoardList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const limit = 8;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getBoardList = async () => {
    const resp = (await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)).data
    console.log(resp.data)
  }
  const goTowrite = () => {
    navigate('/tech/write');
  };
  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
  }, []);

  return (
    
    <Slayout>
      <Layout>

      <div>

        {posts.slice(offset, offset + limit).map(({ id, title, detail, views, creatat, nickname,image }) => (
          <Contentbox key={id}>
            <h3>
              {title}
            </h3>
            <Userbox>
              <h4>{nickname}</h4>
              <User1>{creatat}</User1>
              <h4>| {views}</h4>
            </Userbox>
            <p>{detail}</p>

          </Contentbox>
        ))}
      </div>

      <footer>
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Layout>
      <Button onClick={goTowrite}>게시글 등록하기</Button>
    </Slayout>
  );
};

export default TechBoardList;

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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Contentbox = styled.div`
  border-top: 1px solid #f5a4a4;
  border-bottom: 1px solid #f5a4a4;
  margin-bottom: 20px;
  border-radius: 3%;
`

const Userbox = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 5px;
`
const User1 = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`