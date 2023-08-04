import React, { useState, useCallback } from 'react';
import Agreement from '../Agreement';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AgreementContainer = () => {
  const navigate = useNavigate();

  const [isAgree1, setIsAgree1] = useState(false);
  const [isAgree2, setIsAgree2] = useState(false);

  // 둘 중 하나라도 비동의 => 모두 동의 상태로
  const onChangeAllAgree = useCallback(() => {
    if (!isAgree1 || !isAgree2) {
      setIsAgree1(true);
      setIsAgree2(true);
    } else {
      setIsAgree1(false);
      setIsAgree2(false);
    }
  }, [isAgree1, isAgree2]);

  const onChangeAgree1 = useCallback(() => {
    setIsAgree1(!isAgree1);
  }, [isAgree1]);

  const onChangeAgree2 = useCallback(() => {
    setIsAgree2(!isAgree2);
  }, [isAgree2]);

  const onClickNextBtn = () => {
    if (isAgree1 && isAgree2) {
      navigate('/sign-up');
    } else {
      Swal.fire({
        title:
          '<div style="font-size: 16px; font-weight: 700">전체 동의해주세요.</div>',
        width: '300px',
      });
    }
  };

  const onClickCloseBtn = () => {
    navigate('/');
  };

  return (
    <Agreement
      isAgree1={isAgree1}
      isAgree2={isAgree2}
      onChangeAllAgree={onChangeAllAgree}
      onChangeAgree1={onChangeAgree1}
      onChangeAgree2={onChangeAgree2}
      onClickNextBtn={onClickNextBtn}
      onClickCloseBtn={onClickCloseBtn}
    />
  );
};

export default AgreementContainer;
