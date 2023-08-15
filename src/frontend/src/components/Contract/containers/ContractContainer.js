import React, { useCallback, useState, useRef, useEffect } from 'react';
import Contract from '../Contract';
import Swal from 'sweetalert2';
import {
  requestPostNode,
  requestGetNode,
  requestPut,
  setToken,
} from '../../../lib/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { closeContractModal } from '../../../store/contractSlice';

// info를 통해 계약서에 관한 내용을 전달받고 모달을 연다.
// 서명은 이미지로 저장.
// 제공자는 모든 정보를 수정 가능하고 제공자 서명란 활성화
// 이용자는 정보 수정 불가능하고 이용자 서명란만 활성화
const ContractContainer = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => {
    return state.contract.post;
  });
  const producer = useSelector((state) => {
    return state.contract.producer;
  });
  const consumer = useSelector((state) => {
    return state.contract.consumer;
  });
  const myId = useSelector((state) => {
    return state.contract.myId;
  });
  const chatRoomId = useSelector((state) => {
    return state.contract.chatRoomId;
  });
  const contract_id = useSelector((state) => {
    return state.contract.contractId;
  });

  const [isAgree1, setIsAgree1] = useState(false);
  const [isAgree2, setIsAgree2] = useState(false);
  const [contractForm, setContractForm] = useState({
    room_id: chatRoomId,
    producer_id: producer.id,
    consumer_id: consumer.id,
    productName: '',
    rental_cost: info.rentalCost,
    deposit: info.deposit,
    created_at: '',
    rental_at: '',
    return_at: '',
    period: 0,
    account: '',
  });
  const [producer_sign, setProducer_sign] = useState(null);
  let formData = new FormData();

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

  const onChangePeriod = (e) => {
    setContractForm({ ...contractForm, period: e.target.value });
  };

  const onChangeProductName = (e) => {
    setContractForm({ ...contractForm, productName: e.target.value });
  };

  const onChangeAccount = (e) => {
    setContractForm({ ...contractForm, account: e.target.value });
  };

  useEffect(() => {
    if (myId === producer.id) {
      console.log('제공자!');
      let today = new Date();
      today.setHours(today.getHours() + 9);
      today = today.toISOString().replace('T', ' ').substring(0, 19);
      setContractForm({ ...contractForm, created_at: today });
    } else if (myId === consumer.id) {
      console.log('난 이용자야!!!');
      setToken();
      requestGetNode(`contract/readContract?id=${contract_id}`)
        .then((res) => {
          console.log(res.data.contract_data[0]);
          setContractForm({
            ...contractForm,
            room_id: chatRoomId,
            producer_id: producer.id,
            consumer_id: consumer.id,
            productName: res.data.contract_data[0].productName,
            rental_cost: res.data.contract_data[0].rental_cost,
            deposit: res.data.contract_data[0].deposit,
            created_at: res.data.contract_data[0].created_at,
            rental_at: res.data.contract_data[0].rental_at,
            return_at: res.data.contract_data[0].return_at,
            period: res.data.contract_data[0].period,
            account: res.data.contract_data[0].account,
          });
          setProducer_sign(res.data.contract_data[0].producer_sign);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (contractForm.rental_at) {
      let returnDate = new Date(contractForm.rental_at);
      returnDate.setDate(returnDate.getDate() + Number(contractForm.period));
      returnDate.setHours(returnDate.getHours() + 9);
      setContractForm({
        ...contractForm,
        return_at: returnDate.toISOString().replace('T', ' ').substring(0, 19),
      });
    }
  }, [contractForm.rental_at, contractForm.period]);

  const onChangeRentalDate = (e) => {
    const date = new Date(e.target.value);
    setContractForm({
      ...contractForm,
      rental_at: date.toISOString().replace('T', ' ').substring(0, 19),
    });
  };

  const onClickSendBtn = () => {
    // 제공자 약관 동의
    if (isAgree1 && isAgree2) {
      // 제공자일 경우, 제공자 서명을 가져와 post api로 1차 계약서 작성
      if (myId === producer.id) {
        formData = producerSignRef.current.saveSign();
        if (!formData) {
          Swal.fire({
            title:
              '<div style="font-size: 16px; font-weight: 700">서명을 해주세요.</div>',
            width: '300px',
          }).then(() => {
            return;
          });
        } else {
          if (
            contractForm.productName &&
            contractForm.account &&
            contractForm.deposit &&
            contractForm.period &&
            contractForm.rental_at &&
            contractForm.rental_cost &&
            contractForm.return_at
          ) {
            formData.append(
              'contractForm',
              new Blob([JSON.stringify(contractForm)], {
                type: 'applications/json',
              })
            );
            console.log(formData.get('contractForm'));
            setToken();
            requestPostNode(`contract/contract`, formData, {
              'Content-Type': 'multipart/form-data',
            })
              .then((res) => {
                Swal.fire({
                  title:
                    '<div style="font-size: 16px; font-weight: 700">계약서가 전송되었습니다.</div>',
                  width: '350px',
                }).then(() => {
                  requestPut(`store/status?id=${info.id}`).then((res) => {
                    if (res.data.statusCode === 200) {
                      onClickClose();
                    }
                  });
                });
              }) // 하고 모달 닫기
              .catch((err) => {
                if (err.response.data.statusCode === 403) {
                  Swal.fire({
                    title: `<div style="font-size: 16px; font-weight: 700">${err.response.data.msg}</div>`,
                    width: '350px',
                  }).then(() => {
                    return;
                  });
                }
              });
          } else {
            Swal.fire({
              title:
                '<div style="font-size: 16px; font-weight: 700">계약에 필요한 내용을 모두 입력해주세요.</div>',
              width: '350px',
            }).then(() => {
              return;
            });
          }
        }
      }
    } else {
      Swal.fire({
        title:
          '<div style="font-size: 16px; font-weight: 700">약관에 동의해주세요.</div>',
        width: '300px',
      });
    }
  };

  const onClickFinishBtn = () => {
    console.log('finish');
    // 이용자 약관 동의
    if (isAgree1 && isAgree2) {
      formData = consumerSignRef.current.saveSign();
      if (!formData) {
        Swal.fire({
          title:
            '<div style="font-size: 16px; font-weight: 700">서명을 해주세요.</div>',
          width: '300px',
        }).then(() => {
          return;
        });
      } else {
        // 해당 계약서에 consumer_sign 업데이트
        formData.append(
          'id',
          new Blob([JSON.stringify({ contract_id: contract_id })], {
            type: 'applications/json',
          })
        );
        requestPostNode(`contract/constractConsumer`, formData, {
          'Content-Type': 'multipart/form-data',
        })
          .then((res) => {
            console.log(res);
            Swal.fire({
              title:
                '<div style="font-size: 16px; font-weight: 700">계약이 성립되었습니다.</div>',
              width: '350px',
            }).then(() => {
              requestPut(`store/status?id=${info.id}`).then((res) => {
                if (res.data.statusCode === 200) {
                  onClickClose();
                }
              });
            });
          })
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

  const dateFormat = (date) => {
    const day = new Date(date);
    return (
      day.getFullYear() +
      '-' +
      String(day.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(day.getDate()).padStart(2, '0')
    );
  };

  const onClickClose = () => {
    dispatch(closeContractModal());
  };

  return (
    <Contract
      contractForm={contractForm}
      producer_sign={producer_sign}
      producer={producer}
      consumer={consumer}
      myId={myId}
      producerSignRef={producerSignRef}
      consumerSignRef={consumerSignRef}
      priceFormat={priceFormat}
      dateFormat={dateFormat}
      isAgree1={isAgree1}
      isAgree2={isAgree2}
      onChangeAgree1={onChangeAgree1}
      onChangeAgree2={onChangeAgree2}
      onClickSendBtn={onClickSendBtn}
      onChangeRentalCost={onChangeRentalCost}
      onChangeDeposit={onChangeDeposit}
      onChangeRentalDate={onChangeRentalDate}
      onChangePeriod={onChangePeriod}
      onChangeProductName={onChangeProductName}
      onChangeAccount={onChangeAccount}
      onClickClose={onClickClose}
      onClickFinishBtn={onClickFinishBtn}
    />
  );
};

export default ContractContainer;
