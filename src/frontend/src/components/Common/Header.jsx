import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import { images } from '../../assets/images';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.png'

const Header = ({isLogin, nickname}) => {
  return (
    <SLayout>
      <SContainer>
        <SLogoBox>
          <Link to="/"><STitle src={`${logo}`}/></Link>       
        </SLogoBox>
        <SNav>
          <li><SNavLink to="/store">Store</SNavLink></li>
          <li><SNavLink to="/auction">Auction</SNavLink></li>
          <li><SNavLink to="/tech">Tech</SNavLink></li>
          <li><SNavLink to="/free">Free</SNavLink></li>
        </SNav>
          {isLogin ? <SLoginLink to="/my-page">{nickname}</SLoginLink> : <SLoginLink to="/login">{nickname}</SLoginLink>}
        
      </SContainer>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  background-color: white;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
`;

const SContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const SLogoBox = styled.div`
  display: flex;
  align-items: end;
  padding-left: 100px;
`;

const STitle = styled.img`
  width: 222px;
`;

const SLoginLink = styled(Link)`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  padding: 0px 100px;
`;

const SNavLink = styled(NavLink)`
  color: black;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &.active {
    color: ${colors.deepPrimary};
    font-weight: 700;
    text-decoration-line: underline;
  }
`;

const SNav = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding-bottom: 10px;

  li {
    color: black;
    font-size: 16px;
    font-weight: 500;
    padding: 10px;
  }
`;

export default Header;
