import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';
import { images } from '../../../assets/images';
import { requestPostNode } from '../../../lib/api/api';

const ContractListItem = ({ item, myId, onChangeRender }) => {
  console.log(item);

  const printDate = (date) => {
    return date.substr(0, 10);
  };

  function payment() {
    var url = 'https://developers.kakao.com/demo/pay/prepare';
    var params = {
      agent: 'web',
      itemCode: '1',
      quantity: '5',
    };
    return url + '?' + '1regjlenrgqlhsajkd';
  }

  const onClickPayment = (contractId) => {
    requestPostNode(`contract/readContract`, { contractId }).then(() => {
      onChangeRender();
    });
  };

  const downloadLink = useRef(null);

  const onClickTr = (status) => {
    if (status === -1) {
      downloadLink.current.click();
    }
  };

  return (
    <STr
      onClick={() => {
        onClickTr(item.status);
      }}
    >
      <td className="product">
        <div>{item.productName}</div>
      </td>
      <td className="tradeDate">{printDate(item.rental_at)}</td>
      <td className="returnDate">{printDate(item.return_at)}</td>
      <td className="status">
        {item.status === 0 ? (
          <SStatus status={`${item.status}`}>거래 중</SStatus>
        ) : item.payed === 0 && item.consumer_id === myId ? (
          <a
            href={payment()}
            target="_blank"
            onClick={() => {
              onClickPayment(item.id);
            }}
          >
            <SPayment src={`${images.payment}`} />
          </a>
        ) : (
          <a href={`${item.contract_path}`} download ref={downloadLink}>
            <SStatus status={`${item.status}`}>거래 완료</SStatus>
          </a>
        )}
      </td>
    </STr>
  );
};

const STr = styled.tr`
  height: 80px;
  &:hover {
    background-color: ${colors.primary};
  }
  td {
    color: #000;
    font-size: 16px;
    border-bottom: 1px solid #d9d9d9;
    padding: 20px;
    text-align: center;
  }

  td.product {
    width: 360px;
    div {
      width: 320px;
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
    width: 120px;
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

const SPayment = styled.img`
  width: 80px;
`;

export default ContractListItem;
