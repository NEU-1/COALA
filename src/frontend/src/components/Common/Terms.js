import React from 'react';
import { styled } from 'styled-components';

const Terms = ({ title, text, checked, onChange }) => {
  return (
    <SLayout>
      <STitle>{title}</STitle>
      <SContent>{text}</SContent>
    </SLayout>
  );
};

const SLayout = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const STitle = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const SContent = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  border: 1px solid var(--primary, #e9d5ff);
  color: #000;
  font-size: 16px;
  font-weight: 400;
`;

export default Terms;
