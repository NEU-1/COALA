import React from 'react';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import SideBarContainer from './containers/SideBarContainer';

const MyPage = ({ form }) => {
  return (
    <SLayout>
      <SideBarContainer form={form} />
      <Outlet />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  margin-top: 170px;
`;

export default MyPage;
