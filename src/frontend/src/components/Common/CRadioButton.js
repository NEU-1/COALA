import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';

const CRadioButton = ({ text, name, checked, onChange }) => {
  return (
    <StyledLabel>
      <StyledRadio
        value={text}
        name={name}
        id={text}
        checked={checked}
        onChange={onChange}
      />
      <span>{text}</span>
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  > span {
    min-width: fit-content;
    padding: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #909090;
  }
`;

const StyledRadio = styled.input.attrs(() => ({
  type: 'radio',
}))`
  appearance: none;
  margin: 0 11px 0 0;
  width: 20px;
  height: 20px;
  border: 1.5px solid #909090;
  border-radius: 50%;

  :hover {
    cursor: pointer;
  }

  &:checked {
    background: center
      url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")
      no-repeat;
    border: none;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${colors.primary};
    border-color: transparent;
  }

  :checked ~ span {
    color: #000000;
  }
`;

export default CRadioButton;
