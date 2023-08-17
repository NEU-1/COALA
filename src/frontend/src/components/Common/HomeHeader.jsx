import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import { Link, NavLink } from 'react-router-dom';

const Header = ({isLogin, nickname}) => {
  return (
    <SLayout>
      <SContainer>
        <SLogoBox>
          <STitle to="/">coala</STitle>
           
        <SNav>
          <li><SNavLink to="/store">제공자</SNavLink></li>
          <li><SNavLink to="/auction">이용자</SNavLink></li>
          <li><SNavLink to="/tech">TechBoard</SNavLink></li>
          <li><SNavLink to="/free">FreeBoard</SNavLink></li>
        </SNav>
        {isLogin ? <Link to="/my-page">{nickname}</Link> : <SLoginLink to="/login">{nickname}</SLoginLink>} 
        </SLogoBox>
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
`;

const SContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SLogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 100px;
`;

const STitle = styled(Link)`
  color: black;
  font-size: 64px;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const SLoginLink = styled(Link)`
  color: #000;
  font-size: 16px;
  font-weight: 500;
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
  width: 100%;
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
