import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';
import { images } from '../../../assets/images';

const SideBar = ({
  form,
  profileImg,
  fileInput,
  onChangeProfile,
  onClickUploadImgBtn,
  onClickLogout,
}) => {
  console.log('새로운 이미지', profileImg);
  return (
    <SLayout>
      <SProfile>
        <img
          className="imgProfile"
          src={profileImg ? `${profileImg}` : `${images.default_profile}`}
          alt=""
          onClick={onClickUploadImgBtn}
        />
        <SImgUploader
          type="file"
          ref={fileInput}
          onChange={onChangeProfile}
        ></SImgUploader>
        <SProfileInfo>
          <div className="info">
            <div>
              {form.name}({form.nickname})
            </div>
            <div>
              {form.studentId}/{form.depart}/{form.ordinal}
            </div>
            <div>{form.email}</div>
          </div>
          <Link className="modify" to={`/my-page/modify-userinfo`}>
            회원정보 수정
          </Link>
        </SProfileInfo>
      </SProfile>
      <SSideNavBar>
        <SNavLink to={`/my-page/store-and-auction`}>STORE / AUCTION</SNavLink>
        <SNavLink to={`/my-page/trade-history`}>거래 내역</SNavLink>
        <SNavLink to={`/my-page/all-community`}>COMMUNITY</SNavLink>
        <SNavLink to={`/my-page/wishlist`}>관심 목록</SNavLink>
        <SLogout onClick={onClickLogout}>로그아웃</SLogout>
      </SSideNavBar>
    </SLayout>
  );
};

const SLayout = styled.div`
  margin-top: 140px;
  width: 300px;
  height: 110vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0px;
  gap: 10px;
`;

const SProfile = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${colors.primary};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  .imgProfile {
    display: flex;
    margin: 10px;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: flex-start;
    border-radius: 50%;
    background-color: white;
  }
`;

const SProfileInfo = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-end;
  align-items: flex-end;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;

    color: #000;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
  }

  .modify {
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    text-decoration-line: underline;
  }
`;

const SSideNavBar = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${colors.primary};
  background-color: white;
`;

const SNavLink = styled(NavLink)`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  height: 71px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;

  &.active {
    color: ${colors.deepPrimary};
    font-weight: 700;
    text-decoration-line: underline;
  }
`;

const SImgUploader = styled.input`
  display: none;
`;

const SLogout = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  height: 71px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
`;

export default SideBar;
