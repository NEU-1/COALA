import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import { images } from '../../assets/images';
import { Link } from 'react-router-dom';
import logo from './logo.png'

const Header = ({isLogin, nickname}) => {
  return (
    <SLayout>
      <SContainer>
        <SLogoBox>
        <Link to="/"><STitle src={`${logo}`} alt="사진" /></Link>
          <SSearchBar>
            <img src={`${images.search}`} alt="" />
            <input type="text" placeholder="대여하러 가보자~" />
          </SSearchBar>
          {isLogin ? <Link to="/my-page/store-and-auction">{nickname}</Link> : <SLoginLink to="/login">{nickname}</SLoginLink>}
        </SLogoBox>
        <SNav>
          <li><Link to="/store">Store</Link></li>
          <li><Link to="/auction">Auction</Link></li>
          <li><Link to="/tech">Tech</Link></li>
          <li><Link to="/free">Free</Link></li>
        </SNav>
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
  background-color: white;
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

const STitle = styled.img`
  color: ${colors.primary};
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
  color: #000;
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

const SSearchBar = styled.div`
  display: flex;
  width: 600px;
  height: 50px;
  padding: 10px;
  border: 1px solid ${colors.deepPrimary};

  img {
    margin-right: 10px;
  }

  input {
    width: auto;
  }
`;

const SNav = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 10px;

  li {
    color: black;
    font-size: 16px;
    font-weight: 500;
    padding: 10px;
  }
`;

export default Header;
