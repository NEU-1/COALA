import React, { useState, useEffect } from 'react';
import StoreAndAuction from '../StoreAndAuction';
import { requestPost, setToken } from '../../../lib/api/api';
import { useNavigate } from 'react-router-dom';

// 아무 것도 체크 X, 모두 체크 : STORE와 AUCTION의 정보 모두 출력(가능하면 라디오 버튼으로 변경)
const StoreAndAuctionContainer = () => {
  const [showStore, setShowStore] = useState(true);
  const [showAuction, setShowAuction] = useState(true);
  const [list, setList] = useState(null);
  const onChangeShowStore = () => {
    setShowStore(!showStore);
  };
  const onChangeShowAuction = () => {
    setShowAuction(!showAuction);
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
    let temp = [];
    // store 리스트 가져오기
    if (showStore) {
      requestPost(`mypage/store`)
        .then((res) => {
          res.data.list.forEach((item) => {
            temp.push({
              category: 'S',
              id: item.id,
              title: item.title,
              product: item.category.name,
              created_at: item.createdAt,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // auction 리스트 가져오기
    if (showAuction) {
      requestPost(`mypage/auction`)
        .then((res) => {
          res.data.list.forEach((item) => {
            temp.push({
              category: 'A',
              id: item.id,
              title: item.title,
              product: item.category.name,
              created_at: item.createdAt,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setList(temp);
  }, [showStore, showAuction]);

  return (
    <StoreAndAuction
      list={list}
      onClickItem={onClickItem}
      showStore={showStore}
      showAuction={showAuction}
      onChangeShowStore={onChangeShowStore}
      onChangeShowAuction={onChangeShowAuction}
    />
  );
};

export default StoreAndAuctionContainer;
