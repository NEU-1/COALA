import React from 'react';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';

const MyPage = ({ form }) => {
  return (
    <SLayout>
      <SideBar form={form} />
      <Outlet />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
`;

export default MyPage;
