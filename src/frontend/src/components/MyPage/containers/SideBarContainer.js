import React, { useRef, useState } from 'react';
import SideBar from '../components/SideBar';
import { requestPost } from '../../../lib/api/api';

const SideBarContainer = ({ form }) => {
  const fileInput = useRef(null);
  const [profileImg, setProfileImg] = useState(form.image_path);

  const onChangeProfile = (e) => {
    if (e.target.files[0]) {
      let formData = new FormData();
      formData.append('multipartFile', e.target.files[0]);
      requestPost(`mypage/profile`, formData, {
        'Content-Type': 'multipart/form-data',
      })
        .then((res) => {
          console.log(res);
          //   setProfileImg(res.data.url);
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

  return (
    <SideBar
      form={form}
      profileImg={profileImg}
      fileInput={fileInput}
      onChangeProfile={onChangeProfile}
      onClickUploadImgBtn={onClickUploadImgBtn}
    />
  );
};

export default SideBarContainer;
