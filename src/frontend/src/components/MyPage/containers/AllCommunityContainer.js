import React, { useState, useEffect } from 'react';
import AllCommunity from '../AllCommunity';
import { setToken, requestPost } from '../../../lib/api/api';
import { useNavigate } from 'react-router-dom';

const AllCommunityContainer = () => {
  const [showTech, setShowTech] = useState(true);
  const [showFree, setShowFree] = useState(false);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState(null);

  const onChangeCategory = () => {
    setShowFree(!showFree);
    setShowTech(!showTech);
  };

  const navigate = useNavigate();
  const onClickItem = ({ category, id }) => {
    if (category === 'T') {
      navigate(`/tech/post/detail/${id}`);
    } else {
      navigate(`/free/post/detail/${id}`);
    }
  };

  useEffect(() => {
    setToken();
    // store 리스트 가져오기
    if (showTech) {
      setCategory('T');
      requestPost(`mypage/tech`)
        .then((res) => {
          setList(res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // auction 리스트 가져오기
    if (showFree) {
      setCategory('F');
      requestPost(`mypage/free`)
        .then((res) => {
          setList(res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showTech, showFree]);

  return (
    <AllCommunity
      list={list.sort(function (a, b) {
        return new Date(b.createAt) - new Date(a.createAt);
      })}
      category={category}
      onClickItem={onClickItem}
      showTech={showTech}
      showFree={showFree}
      onChangeCategory={onChangeCategory}
    />
  );
};

export default AllCommunityContainer;
