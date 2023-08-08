import React, { useEffect, useRef, useState } from 'react';
import { Signature } from '../components/Signature';

const SignatureContainer = ({ name, who }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [canvasSign, setCanvasSign] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = '120';
    canvas.height = '60';

    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 1.5;
    context.font = '14px Varela Round';
    context.textAlign = 'center';
    context.fillText(who, 60, 35);
    contextRef.current = context;

    setCanvasSign(contextRef.current);
  }, []);

  const onStartDrawing = (e) => {
    console.log(e);
    if (e.button === 2) {
      resetCanvas();
    }
    setIsDrawing(true);
  };

  const onFinishDrawing = () => {
    setIsDrawing(false);
  };

  const onDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (canvasSign) {
      if (!isDrawing) {
        canvasSign.beginPath();
        canvasSign.moveTo(offsetX, offsetY);
      } else {
        canvasSign.lineTo(offsetX, offsetY);
        canvasSign.stroke();
      }
    }
  };

  const resetCanvas = () => {
    if (canvasSign) {
      canvasSign.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const context = canvasRef.current.getContext('2d');
      context.font = '14px Varela Round';
      context.textAlign = 'center';
      context.fillText(who, 60, 35);
    }
  };

  return (
    <Signature
      name={name}
      canvasRef={canvasRef}
      onStartDrawing={onStartDrawing}
      onFinishDrawing={onFinishDrawing}
      onDrawing={onDrawing}
    />
  );
};

export default SignatureContainer;
