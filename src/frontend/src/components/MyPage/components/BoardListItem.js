import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';

const BoardListItem = ({ item, category, onClickItem }) => {
  console.log(item);
  const printDate = (date) => {
    return date.split('T')[0];
  };
  return category ? (
    <STr
      onClick={() => {
        onClickItem({ category: category, id: item.id });
      }}
    >
      <td className="category">{category === 'S' ? 'STORE' : 'AUCTION'}</td>
      <td className="product">{item.category.name}</td>
      <td className="title">
        <div>{item.title}</div>
      </td>
      <td className="date">{printDate(item.createdAt)}</td>
    </STr>
  ) : (
    <STr
      onClick={() => {
        onClickItem({ id: item.storePost.id });
      }}
    >
      <td className="category">STORE</td>
      <td className="product">{item.storePost.category.name}</td>
      <td className="title">
        <div>{item.storePost.title}</div>
      </td>
      <td className="date">{printDate(item.createdAt)}</td>
    </STr>
  );
};

const STr = styled.tr`
  td {
    color: #000;
    font-size: 16px;
    text-align: center;
    padding: 20px;
    border-bottom: 1px solid ${colors.primary};
  }
  td.category,
  td.product {
    width: 120px;
  }

  td.title {
    width: 340px;
  }

  td.date {
    width: 200px;
  }
  div {
    width: 300px;
    overflow: hidden; //width 값에 벗어나면 숨김
    white-space: nowrap; //글씨가 길어도 아래로 떨어지지 않게 처리
    text-overflow: ellipsis; //점처리'
  }
`;

export default BoardListItem;
