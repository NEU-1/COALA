import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Signature } from '../components/Signature';

const SignatureContainer = forwardRef(({ name, who }, ref) => {
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

  const saveSign = () => {
    const blank = document.createElement('canvas');
    const canvas = canvasRef.current;
    blank.width = canvas.width;
    blank.height = canvas.height;
    const blankContext = blank.getContext('2d');
    blankContext.font = '14px Varela Round';
    blankContext.textAlign = 'center';
    blankContext.fillText(who, 60, 35);

    // 서명이 비어있는지 확인
    if (canvas.toDataURL() === blank.toDataURL()) {
      return null;
    } else {
      const imgBase64 = canvas.toDataURL();
      const decoding = atob(imgBase64.split(',')[1]);

      let array = [];
      for (let i = 0; i < decoding.length; i++)
        array.push(decoding.charCodeAt(i));

      const file = new Blob([new Uint8Array(array)], { type: 'image/png' });
      const fileName = 'sign_img_' + name + '_' + new Date().getTime() + '.png';
      let formData = new FormData();
      formData.append('file', file, fileName);
      return formData;
    }
  };

  useImperativeHandle(ref, () => ({
    saveSign,
  }));

  return (
    <Signature
      name={name}
      canvasRef={canvasRef}
      onStartDrawing={onStartDrawing}
      onFinishDrawing={onFinishDrawing}
      onDrawing={onDrawing}
    />
  );
});

export default SignatureContainer;
