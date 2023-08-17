import React from 'react';
import { styled } from 'styled-components';
import HomeHeader from '../Common/HomeHeader';
import Coalahome2 from './Coalahome2.png';
import coala from './coala.png';


const Home = () => {
  
  return(
    <SLayout>
      <HomeHeader/>
      <Img src={`${coala}`} alt="사진" />
      <div className='image-bg' styled>
      <Img2 src={`${Coalahome2}`} alt="사진" />
      </div>
    </SLayout>
  )
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('');
`
const Homelayout = styled.div`
  width: 100%;
  height : 300px;
`
const Img  = styled.img`
  display: flex;
  flex-direction: column;
  justify-content:start;
  width: 100vw;
  height: 1080px;

`
const Img2 = styled.img`
   width: 100vw;
`
export default Home;
