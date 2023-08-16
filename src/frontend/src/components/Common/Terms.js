import React from 'react';
import { styled } from 'styled-components';
import CCheckBox from './CCheckBox';

const Terms = ({ title, text, checked, onChange }) => {
  return (
    <SLayout>
      <STitle>{title}</STitle>
      <SContent>{text}</SContent>
      <SCheckbox>
        <CCheckBox text={'동의'} checked={checked} onChange={onChange} />
      </SCheckbox>
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
  height: 144px;
  border: 1px solid var(--primary, #e9d5ff);
  color: #000;
  font-size: 16px;
  font-weight: 400;
  overflow: auto;
`;

const SCheckbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default Terms;
