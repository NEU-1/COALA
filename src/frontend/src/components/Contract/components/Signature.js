import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../assets/colors';

export const Signature = ({
  name,
  canvasRef,
  onStartDrawing,
  onFinishDrawing,
  onDrawing,
}) => {
  return (
    <SLayout>
      <SName>{name}</SName>
      <SCanvas
        ref={canvasRef}
        onMouseDown={onStartDrawing}
        onMouseUp={onFinishDrawing}
        onMouseMove={onDrawing}
        onMouseLeave={onFinishDrawing}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      ></SCanvas>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SName = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const SCanvas = styled.canvas`
  background: #fff;
  border: 1px solid ${colors.middlePrimary};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
