import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components"
import { useNavigate, Link } from 'react-router-dom';
import {requestGet} from "../../../lib/api/api"



const TechBoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [member, setMember] = useState()


  const getBoardList = () => {
    // const resp = await axios.get(`http://i9d108.p.ssafy.io:9999/api/tech/post/${page}`)
    requestGet(`tech/post/${page}`)
    .then(res=>{console.log(res.data);setPosts(res.data.list);})

  }

  
  const goTowrite = () => {
    navigate('/tech/write');
  };

  useEffect(() => {
    getBoardList() // 1) 게시글 목록 조회 함수 호출
  }, []);

  return (
    <Slayout>
      <Layout>   
        {/* {posts.slice(offset, offset + limit).map(({ id, title, detail, views, createAt,imagePath,memberId }) => ( */}
        {posts.map(({ id, title, views, createAt,imagePath,memberId  }) => (
          <Contentbox key={id}>
            <div>
            <Link to={`/tech/post/detail/${id}`}>
              <Titletext>
                {title}
              </Titletext>
              <Userbox>
                <Usertext>{memberId.nickname}</Usertext>
                <Numbertext>|</Numbertext>
                <Numbertext>{createAt.slice(0,10)}</Numbertext>
                <Numbertext>|</Numbertext>
                <Usertext>조회수</Usertext>
                <Numbertext>{views}</Numbertext>
              </Userbox>
              </Link>
            </div>
            <Simg src={imagePath} alt="사진" />
   
          </Contentbox>
        ))}
      <Button onClick={goTowrite}>게시글 등록</Button>  
    </Layout>  
    </Slayout>
  );
};

export default TechBoardList;

const Slayout = styled.div`
  margin-top: 170px;
  
`
const Button = styled.div`
  display: flex;
  height: 40px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120px;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #BD84FC;
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
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #BD84FC;
  margin-bottom: 10px;
  width: 800px;
  cursor: pointer;
`

const Userbox = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 5px;
`
const Usertext = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 13px;
`
const Numbertext = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 13px;
  margin-top: 3px;
`
const Titletext = styled.div`
  font-size: 15px;
  margin-left: 5px;
`
const Commentcontainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 800px;
  margin-top: 0;
`
const Freecontainer = styled.div`
  display: flex;
`

const Freeword = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100px;
  padding-top: 10px;
  margin-right: 20px;

`
const Simg = styled.img`
  height: 80px;
  width: 80px;
  `