import React from 'react';
import { css, styled } from 'styled-components';
import { colors } from '../../assets/colors';

const CCheckBox = ({ text, checked, onChange }) => {
  return (
    <StyledLabel>
      <StyledInput
        type="checkbox"
        id={text}
        name={text}
        checked={checked}
        onChange={onChange}
      />
      <StyledP checked={checked}>{text}</StyledP>
    </StyledLabel>
  );
};

export default CCheckBox;

const StyledInput = styled.input`
  appearance: none;
  padding: 10px;
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${colors.primary};
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
  margin-left: 10px;
  color: #909090;
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  ${(props) =>
    props.checked &&
    css`
      font-weight: 500;
      color: black;
    `};
`;
