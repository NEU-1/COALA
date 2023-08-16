import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';
import CRadioButton from '../Common/CRadioButton';
import FreeTechListItem from './components/FreeTechListItem';

const AllCommunity = ({
  list,
  category,
  onClickItem,
  showTech,
  showFree,
  onChangeCategory,
}) => {
  console.log(list);
  return (
    <SLayout>
      <SContainer>
        <STitleBlock>
          <STitle>내가 쓴 글</STitle>
          <SCheckBoxBlock>
            <CRadioButton
              text={'Tech'}
              name={'category'}
              checked={showTech}
              onChange={onChangeCategory}
            />
            <CRadioButton
              text={'Free'}
              name={'category'}
              checked={showFree}
              onChange={onChangeCategory}
            />
          </SCheckBoxBlock>
        </STitleBlock>
        <STable>
          <thead>
            <tr>
              <th className="category">분류</th>
              <th className="title">제목</th>
              <th className="date">작성일</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item) => {
                return (
                  <FreeTechListItem
                    item={item}
                    category={category}
                    key={category + item.id}
                    onClickItem={onClickItem}
                  />
                );
              })
            ) : (
              <td colSpan={4}>
                <SEmpty>작성한 글이 없습니다.</SEmpty>
              </td>
            )}
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

    th.category {
      width: 120px;
    }
    th.title {
      width: 460px;
    }

    th.date {
      width: 200px;
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

export default AllCommunity;
