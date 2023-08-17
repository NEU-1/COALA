import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterWrapper>
      <ContentContainer>
        <div className="row">
          <div className="col">
            <FooterContent>
              <Navigation>
                <NavigationLink>이용약관</NavigationLink>|
                <NavigationLink>개인정보처리방침</NavigationLink>|
                <NavigationLink>사이트맵</NavigationLink>
              </Navigation>
              <FooterText>
                <span>고객센터 02-8980-3527 | 평일 상담시간 09:00 ~ 18:00</span>
                <br />
                <span>
                  본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재,
                  복사, 배포 등을 금합니다.
                </span>
                <br />
                <span>Copyright &copy; COALA All Rights Reserved.</span>
              </FooterText>
            </FooterContent>
          </div>
        </div>
      </ContentContainer>
    </FooterWrapper>
  );
}
export default Footer;

const FooterWrapper = styled.div`
  border-top: 1px solid #dee2e6;
  padding: 1rem 0;
  width: 100vw;
  z-index: 10;
  margin-top: 60px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ContentContainer = styled.div`
  font-size: 0.9rem;
  color: #808080;
`;

const FooterContent = styled.div`
  width: 100%;
  height: 90px;
`;

const Navigation = styled.nav`
  a {
    display: inline-block;
    margin: 0 20px 10px 20px;
    color: #808080;
    &:visited {
      color: #808080;
    }
  }
`;

const NavigationLink = styled.a`
  margin: 0 10px;
  color: #808080;
  &:visited {
    color: #808080;
  }
  &:not(:last-child)::after {
    margin: 10px;
  }
`;

const FooterText = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  span {
    display: inline-block;
    margin-left: 20px;
  }
`;
