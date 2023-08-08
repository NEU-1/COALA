import React, { useCallback, useState } from 'react';
import Contract from '../Contract';
import Swal from 'sweetalert2';

// info를 통해 계약서에 관한 내용을 전달받고 모달을 연다.
// 서명은 이미지로 저장.
// 제공자는 모든 정보를 수정 가능하고 제공자 서명란 활성화
// 이용자는 정보 수정 불가능하고 이용자 서명란만 활성화
const ContractContainer = ({ info, onChangeModalFlag }) => {
  const [isAgree1, setIsAgree1] = useState(false);
  const [isAgree2, setIsAgree2] = useState(false);

  const onChangeAgree1 = useCallback(() => {
    setIsAgree1(!isAgree1);
  }, [isAgree1]);

  const onChangeAgree2 = useCallback(() => {
    setIsAgree2(!isAgree2);
  }, [isAgree2]);

  const onClickSendBtn = () => {
    if (isAgree1 && isAgree2) {
      console.log('전송가능!');
    } else {
      Swal.fire({
        title:
          '<div style="font-size: 16px; font-weight: 700">약관에 동의해주세요.</div>',
        width: '300px',
      });
    }
  };

  return (
    <Contract
      isAgree1={isAgree1}
      isAgree2={isAgree2}
      onChangeAgree1={onChangeAgree1}
      onChangeAgree2={onChangeAgree2}
      info={info}
      onClickSendBtn={onClickSendBtn}
      onChangeModalFlag={onChangeModalFlag}
    />
  );
};

export default ContractContainer;
