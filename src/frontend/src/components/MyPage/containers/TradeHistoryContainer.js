import React, { useEffect, useState } from 'react';
import TradeHistory from '../TradeHistory';
import { requestGet, setToken } from '../../../lib/api/api';
import axios from 'axios';

let email = null;

const TradeHistoryContainer = () => {
  const [trading, setTrading] = useState(true);
  const [traded, setTraded] = useState(true);
  const [contractList, setContractList] = useState(null);

  const onChangeTrading = () => {
    setTrading(!trading);
  };
  const onChangeTraded = () => {
    setTraded(!traded);
  };

  useEffect(() => {
    setToken();
    requestGet(`member/info`).then((res) => {
      email = res.data.member.email;
    });
  }, []);

  const getContractList = async () => {
    await axios
      .get(
        `http://i9d108.p.ssafy.io:3030/api/contract/contract?email=${email}`,
        {}
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (email) {
      getContractList();
    }
  }, [traded, trading]);

  return (
    <TradeHistory
      trading={trading}
      traded={traded}
      onChangeTrading={onChangeTrading}
      onChangeTraded={onChangeTraded}
    />
  );
};

export default TradeHistoryContainer;
