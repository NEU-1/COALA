import React, { useEffect, useState } from 'react';
import TradeHistory from '../TradeHistory';
import { requestGet, requestGetNode, setToken } from '../../../lib/api/api';

let email = null;

const TradeHistoryContainer = () => {
  const [trading, setTrading] = useState(true);
  const [traded, setTraded] = useState(true);
  const [contractList, setContractList] = useState([]);
  const [myId, setMyId] = useState(null);
  const [render, setRender] = useState(false);

  const onChangeRender = () => {
    setRender(!render);
  };

  const onChangeTrading = () => {
    setTrading(!trading);
  };
  const onChangeTraded = () => {
    setTraded(!traded);
  };

  useEffect(() => {
    setToken();
    requestGet(`member/info`)
      .then((res) => {
        email = res.data.member.email;
        setMyId(res.data.member.id);
      })
      .then(() => {
        requestGetNode(`contract/contract?email=${email}`)
          .then((res) => {
            setContractList([...res.data.consumer, ...res.data.producer]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [traded, trading, render]);

  return (
    <TradeHistory
      contractList={contractList.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      })}
      myId={myId}
      trading={trading}
      traded={traded}
      onChangeTrading={onChangeTrading}
      onChangeTraded={onChangeTraded}
      render={render}
      onChangeRender={onChangeRender}
    />
  );
};

export default TradeHistoryContainer;
