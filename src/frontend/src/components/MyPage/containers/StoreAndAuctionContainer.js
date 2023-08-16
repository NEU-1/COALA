import React, { useState, useEffect } from 'react';
import StoreAndAuction from '../StoreAndAuction';
import { requestGet, setToken } from '../../../lib/api/api';

// 아무 것도 체크 X, 모두 체크 : STORE와 AUCTION의 정보 모두 출력(가능하면 라디오 버튼으로 변경)
const StoreAndAuctionContainer = () => {
  const [showStore, setShowStore] = useState(true);
  const [showAuction, setShowAuction] = useState(true);
  const [list, setList] = useState([
    {
      category: 'S',
      id: 1,
      title: 'title1',
      product: '키보드',
      created_at: '2023-08-11T13:15:31',
    },
    {
      category: 'S',
      id: 1,
      title: 'title1',
      product: '키보드',
      created_at: '2023-08-11T13:15:31',
    },
    {
      category: 'S',
      id: 1,
      title: 'title1',
      product: '키보드',
      created_at: '2023-08-11T13:15:31',
    },
  ]);
  const onChangeShowStore = () => {
    setShowStore(!showStore);
  };
  const onChangeShowAuction = () => {
    setShowAuction(!showAuction);
  };

  useEffect(() => {
    setToken();
    // store 리스트 가져오기
    if (showStore) {
    }
    // auction 리스트 가져오기
  }, [showStore, showAuction]);

  return (
    <StoreAndAuction
      list={list}
      showStore={showStore}
      showAuction={showAuction}
      onChangeShowStore={onChangeShowStore}
      onChangeShowAuction={onChangeShowAuction}
    />
  );
};

export default StoreAndAuctionContainer;
