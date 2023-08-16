import React, { useEffect, useState } from 'react';
import Wishlist from '../Wishlist';
import { useNavigate } from 'react-router-dom';
import { requestPost, setToken } from '../../../lib/api/api';

const WishlistContainer = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const onClickItem = ({ id }) => {
    navigate(`/store/${id}`);
  };

  useEffect(() => {
    setToken();
    requestPost(`mypage/favorite`)
      .then((res) => {
        setList(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Wishlist list={list} onClickItem={onClickItem} />;
};

export default WishlistContainer;
