import React, { useRef, useState } from 'react';
import SideBar from '../components/SideBar';
import { requestGet, requestPost } from '../../../lib/api/api';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/LoginSlice';

const SideBarContainer = ({ form }) => {
  console.log(form);
  const fileInput = useRef(null);
  const [profileImg, setProfileImg] = useState(form.imagePath);

  const onChangeProfile = (e) => {
    if (e.target.files[0]) {
      let formData = new FormData();
      formData.append('multipartFile', e.target.files[0]);
      requestPost(`mypage/profile`, formData, {
        'Content-Type': 'multipart/form-data',
      })
        .then((res) => {
          if (res.data.statusCode === 200) {
            requestGet('member/info').then((res) => {
              setProfileImg(res.data.member.imagePath);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const onClickUploadImgBtn = () => {
    if (!fileInput.current) {
      return;
    }
    fileInput.current.click();
  };

  const dispatch = useDispatch();
  const onClickLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch(logout());
    window.location.replace('/');
  };

  return (
    <SideBar
      form={form}
      profileImg={profileImg}
      fileInput={fileInput}
      onChangeProfile={onChangeProfile}
      onClickUploadImgBtn={onClickUploadImgBtn}
      onClickLogout={onClickLogout}
    />
  );
};

export default SideBarContainer;
