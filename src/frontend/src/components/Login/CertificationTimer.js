import React, { useEffect, useState } from 'react';

const CertificationTimer = ({ setTurnOnTimer }) => {
  const [countedNum, setCountedNum] = useState(180);

  const getMinuteFormat = (num) => {
    const minutes = Math.floor(num / 60);
    const seconds = Math.floor(num % 60);
    return minutes + ':' + String(seconds).padStart(2, '0');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countedNum > 0) {
        setCountedNum((prevTime) => prevTime - 1);
      }

      if (countedNum === 0) {
        clearInterval(timer);
        setTurnOnTimer(false);
        setCountedNum(180);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countedNum]);

  return (
    <div className="certificationTimer">{getMinuteFormat(countedNum)}</div>
  );
};

export default CertificationTimer;
