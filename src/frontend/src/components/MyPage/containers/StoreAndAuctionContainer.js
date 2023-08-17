import React, { useState, useEffect } from 'react';
import StoreAndAuction from '../StoreAndAuction';
import { requestPost, setToken } from '../../../lib/api/api';
import { useNavigate } from 'react-router-dom';

// 아무 것도 체크 X, 모두 체크 : STORE와 AUCTION의 정보 모두 출력(가능하면 라디오 버튼으로 변경)
const StoreAndAuctionContainer = () => {
  const [showStore, setShowStore] = useState(true);
  const [showAuction, setShowAuction] = useState(false);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState(null);
  const onChangeShowStore = () => {
    setShowStore(true);
    setShowAuction(false);
  };
  const onChangeShowAuction = () => {
    setShowAuction(true);
    setShowStore(false);
  };

  const navigate = useNavigate();
  const onClickItem = ({ category, id }) => {
    if (category === 'S') {
      navigate(`/store/${id}`);
    } else {
      navigate(`/auction/${id}`);
    }
  };

  useEffect(() => {
    setToken();
    // store 리스트 가져오기
    if (showStore) {
      setCategory('S');
      requestPost(`mypage/store`)
        .then((res) => {
          setList(res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // auction 리스트 가져오기
    if (showAuction) {
      setCategory('A');
      requestPost(`mypage/auction`)
        .then((res) => {
          setList(res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showStore, showAuction]);

  return (
    <StoreAndAuction
      list={list}
      category={category}
      onClickItem={onClickItem}
      showStore={showStore}
      showAuction={showAuction}
      onChangeShowStore={onChangeShowStore}
      onChangeShowAuction={onChangeShowAuction}
    />
  );
};

export default StoreAndAuctionContainer;
