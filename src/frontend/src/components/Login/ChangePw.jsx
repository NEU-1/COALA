import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Style.css";
import { requestPut } from "../../lib/api/api";

const ChangePw = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const emailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const passwordCheckHandler = (e) => {
    setPasswordCheck(e.currentTarget.value);
  };

  const onClickChangePw = async (e) => {
    e.preventDefault();
    if (password === passwordCheck) {
      
      requestPut(`member/updatepassword`, { email: email, password: password })
      .then((res) => {
        if (res.status === 200) {
          alert("비밀번호 변경이 완료되었습니다. 로그인 해주세요.");
          navigate("/login");
        } else {
          console.log("비밀번호 변경 중 에러 발생");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      console.log("비밀번호가 다릅니다!")
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={onSubmitHandler}>
        <label className="coala" onClick={navigateToHome}>
          COALA
        </label>
        <label className="text">이메일</label>
        <input
          type="id"
          className="input"
          value={email}
          onChange={emailHandler}
          placeholder="이메일"
        />
        <label className="text">비밀번호</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={passwordHandler}
          placeholder="비밀번호"
        />
        <label className="text">비밀번호 확인</label>
        <input
          type="password"
          className="input"
          value={passwordCheck}
          onChange={passwordCheckHandler}
          placeholder="비밀번호 확인"
        />

        <button className="button" type="button" onClick={onClickChangePw}>
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default ChangePw;
