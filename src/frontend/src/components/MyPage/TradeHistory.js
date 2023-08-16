import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import CCheckBox from '../Common/CCheckBox';

const TradeHistory = ({
  list,
  onClickItem,
  trading,
  traded,
  onChangeTrading,
  onChangeTraded,
}) => {
  return (
    <SLayout>
      <SContainer>
        <STitleBlock>
          <STitle>거래 내역</STitle>
          <SCheckBoxBlock>
            <CCheckBox
              text={'거래 중'}
              checked={trading}
              onChange={onChangeTrading}
            />
            <CCheckBox
              text={'거래 완료'}
              checked={traded}
              onChange={onChangeTraded}
            />
          </SCheckBoxBlock>
        </STitleBlock>
        <STable>
          <thead>
            <tr>
              <th className="product">제품명</th>
              <th className="trader">거래자</th>
              <th className="returnDate">반납일</th>
              <th className="status">상태</th>
            </tr>
          </thead>
          <tbody>
            <td colSpan={4}>
              <SEmpty>작성한 글이 없습니다.</SEmpty>
            </td>
          </tbody>
        </STable>
      </SContainer>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SContainer = styled.div`
  display: flex;
  width: 800px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const STitleBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

const STitle = styled.div`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const SCheckBoxBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const STable = styled.table`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;

  thead {
    width: 100%;

    th {
      color: #000;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid ${colors.primary};
      padding: 20px;
    }

    th.product {
      width: 380px;
    }
    th.trader {
      width: 150px;
    }
    th.returnDate {
      width: 150px;
    }
  }
`;

const SEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  color: #d9d9d9;
`;

export default TradeHistory;
