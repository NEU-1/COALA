import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../assets/colors';

const CButton = ({ text, onClick, bgColor, textColor }) => {
  return (
    <SButton bgColor={bgColor} textColor={textColor} onClick={onClick}>
      {text}
    </SButton>
  );
};

const SButton = styled.button`
  display: flex;
  height: 40px;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background: ${(props) => (props.bgColor ? props.bgColor : colors.primary)};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: ${(props) => (props.textColor ? props.textColor : 'white')};
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 700;
`;

export default CButton;
