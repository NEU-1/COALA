import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';

const ContractListItem = ({ item }) => {
  console.log(item);
  const printDate = (date) => {
    return date.substr(0, 10);
  };
  return (
    <STr>
      <td className="product">
        <div>{item.productName}</div>
      </td>
      <td className="tradeDate">{printDate(item.rental_at)}</td>
      <td className="returnDate">{printDate(item.return_at)}</td>
      <td className="status">
        <SStatus status={`${item.status}`}>
          {item.status === 0 ? '거래 중' : '거래 완료'}
        </SStatus>
      </td>
    </STr>
  );
};

const STr = styled.tr`
  td {
    color: #000;
    font-size: 16px;
    border-bottom: 1px solid ${colors.primary};
    padding: 20px;
    text-align: center;
  }

  td.product {
    width: 380px;
    div {
      width: 340px;
      overflow: hidden; //width 값에 벗어나면 숨김
      white-space: nowrap; //글씨가 길어도 아래로 떨어지지 않게 처리
      text-overflow: ellipsis; //점처리'
    }
  }
  td.tradeDate {
    width: 150px;
  }
  td.returnDate {
    width: 150px;
  }
  td.status {
    width: 100px;
  }
`;

const SStatus = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${(props) =>
    props.status === '0' ? `${colors.middlePrimary}` : `${colors.deepPrimary}`};
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
`;

export default ContractListItem;
