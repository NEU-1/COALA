import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Style.css";
import { requestPut } from "../../lib/api/api";
import Swal from "sweetalert2";

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
    const showAlert = (icon, title) => {
      Swal.fire({
        icon,
        title,
        html: "",
        timer: 1000,
        showConfirmButton: false,
      });
    };
    
    const isPasswordValid = (password, passwordCheck) => {
      if (!email) {
        showAlert("warning", "이메일 칸이 비어있습니다.\n이메일을 입력해주세요.");
        return false;
      }
      if (!password || !passwordCheck) {
        showAlert("warning", "비밀번호 칸이 비어있습니다.\n비밀번호를 입력해주세요.");
        return false;
      }
      if (password !== passwordCheck) {
        showAlert("warning", "비밀번호가 일치하지 않습니다.\n다시 입력해주세요.");
        return false;
      }
      return true;
    };
  
    if (isPasswordValid(password, passwordCheck)) {
      requestPut(`member/updatepassword`, { email: email, password: password })
        .then((res) => {
          showAlert("success", "비밀번호 변경이 완료되었습니다.\n로그인 해주세요.");
          // navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
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
