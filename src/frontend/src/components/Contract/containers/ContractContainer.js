import React, { useCallback, useState, useRef } from 'react';
import Contract from '../Contract';
import Swal from 'sweetalert2';
import { requestPostNode, setToken } from '../../../lib/api/api';

// info를 통해 계약서에 관한 내용을 전달받고 모달을 연다.
// 서명은 이미지로 저장.
// 제공자는 모든 정보를 수정 가능하고 제공자 서명란 활성화
// 이용자는 정보 수정 불가능하고 이용자 서명란만 활성화
const ContractContainer = ({ info, onChangeModalFlag }) => {
  let today = new Date();
  today.setHours(today.getHours() + 9);
  today = today.toISOString();
  const [isAgree1, setIsAgree1] = useState(false);
  const [isAgree2, setIsAgree2] = useState(false);
  const [contractForm, setContractForm] = useState({
    producer_id: 1,
    consumer_id: 2,
    rental_cost: 5000,
    deposit: 20000,
    created_at: today,
    rental_at: today,
    return_at: today,
    status: 0,
    producer_sign: null,
    account: '신한 110-111-222222',
  });
  const [producer, setProducer] = useState('강승현');
  const [consumer, setConsumer] = useState('심은진');
  const [post, setPost] = useState({
    productName: '한성 키보드',
  });

  const producerSignRef = useRef(null);
  const consumerSignRef = useRef(null);

  const onChangeAgree1 = useCallback(() => {
    setIsAgree1(!isAgree1);
  }, [isAgree1]);

  const onChangeAgree2 = useCallback(() => {
    setIsAgree2(!isAgree2);
  }, [isAgree2]);

  const onChangeRentalCost = (e) => {
    setContractForm({ ...contractForm, rental_cost: e.target.value });
  };

  const onChangeDeposit = (e) => {
    setContractForm({ ...contractForm, deposit: e.target.value });
  };

  const onClickSendBtn = () => {
    if (isAgree1 && isAgree2) {
      const image = producerSignRef.current.saveSign();
      if (!image) {
        Swal.fire({
          title:
            '<div style="font-size: 16px; font-weight: 700">서명을 해주세요.</div>',
          width: '300px',
        }).then(() => {
          return;
        });
      } else {
        setContractForm({ ...contractForm, producer_sign: image });
        setToken();
        requestPostNode(`contract/contract`, contractForm)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    } else {
      Swal.fire({
        title:
          '<div style="font-size: 16px; font-weight: 700">약관에 동의해주세요.</div>',
        width: '300px',
      });
    }
  };

  const priceFormat = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Contract
      contractForm={contractForm}
      producer={producer}
      consumer={consumer}
      post={post}
      producerSignRef={producerSignRef}
      consumerSignRef={consumerSignRef}
      priceFormat={priceFormat}
      isAgree1={isAgree1}
      isAgree2={isAgree2}
      onChangeAgree1={onChangeAgree1}
      onChangeAgree2={onChangeAgree2}
      onClickSendBtn={onClickSendBtn}
      onChangeModalFlag={onChangeModalFlag}
      onChangeRentalCost={onChangeRentalCost}
      onChangeDeposit={onChangeDeposit}
    />
  );
};

export default ContractContainer;
