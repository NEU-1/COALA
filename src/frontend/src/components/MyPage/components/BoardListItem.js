import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';

const BoardListItem = ({ item, onClickItem }) => {
  console.log(item);
  const printDate = (date) => {
    return date.split('T')[0];
  };
  return (
    <STr
      onClick={() => {
        onClickItem({ category: item.category, id: item.id });
      }}
    >
      <td className="category">
        {item.category === 'S' ? 'STORE' : 'AUCTION'}
      </td>
      <td className="product">{item.product}</td>
      <td className="title">
        <div>{item.title}</div>
      </td>
      <td className="date">{printDate(item.created_at)}</td>
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
