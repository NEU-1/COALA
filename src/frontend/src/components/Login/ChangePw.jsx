import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Style.css";

const ChangePw = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("id");
    console.log("changepw");
  };
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const [inputPw, setInputPw] = useState("");
  const [inputCheckPw, setInputCheckPw] = useState("");

  const oninputPwHandler = (e) => {
    setInputPw(e.currentTarget.value);
  };
  const oninputCheckPwHandler = (e) => {
    setInputCheckPw(e.currentTarget.value);
  };

  const onClickChangePw = async (e) => {
    e.preventDefault();
    if (inputPw === inputCheckPw) {
        alert("비밀번호 변경이 완료되었습니다. 로그인 해주세요.")
        navigate("/changepw");
    } else {
        alert("비밀번호가 다릅니다!")
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={onSubmitHandler}>
        <label className="coala" onClick={navigateToHome}>
          COALA
        </label>
        <label className="text">비밀번호</label>
        <input
          type="id"
          className="input"
          value={inputPw}
          onChange={oninputPwHandler}
          placeholder="아이디"
        />
        <label className="text">비밀번호 확인</label>
        <input
          type="password"
          className="input"
          value={inputCheckPw}
          onChange={oninputCheckPwHandler}
          placeholder="비밀번호"
        />

        <button
          className="button"
          type="button"
          onClick={onClickChangePw}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default ChangePw;
