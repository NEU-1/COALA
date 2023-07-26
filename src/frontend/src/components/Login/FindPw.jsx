import React from "react";

export const FindPw = () => {

  
  return (
    <div className="page">
      <form className="form" onSubmit={onSubmitHandler}>
        <label className="coala" onClick={navigateToHome}>
          COALA
        </label>
        <input
          type="id"
          className="input"
          value={inputEmail}
          onChange={oninputEmailHandler}
          placeholder="이메일"
        />
        <input
          type="password"
          className="input"
          value={inputName}
          onChange={oninputNameHandler}
          placeholder="이름"
        />
        <input
          type="number"
          className="input"
          value={inputStudentId}
          onChange={oninputStudentIdHandler}
          placeholder="학번"
        />
        <button
          className="button"
          type="button"
          onClick={onClickCallCertification}
        >
          인증
        </button>
        <input
          type="number"
          className="input"
          value={inputcertification}
          onChange={oninputcertificationHandler}
          placeholder="인증번호"
        />
        <button className="button" type="button" onClick={onClickCertification}>
          인증번호 발송
        </button>
      </form>
    </div>
  );
};
export default FindPw;
