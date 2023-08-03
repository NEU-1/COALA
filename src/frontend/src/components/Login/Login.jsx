import React, { useState } from "react";
import axios from "axios";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import CCheckBox from "../Common/CCheckBox";
import { requestPost } from '../../lib/api/api';


const Login = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("inputId", inputId);
    console.log("inputPw", inputPw);
  };

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [loginFailCount, setLoginFailCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveIdCheck, setSaveIDFlag] = useState(false);
  const saveId = "saveId";

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToSignUp = () => {
    navigate("/sign-up/agreement");
  };
  const navigateToFindPw = () => {
    navigate("/findpw");
  };

  const oninputIdHandler = (e) => setInputId(e.currentTarget.value);
  const oninputPwHandler = (e) => setInputPw(e.currentTarget.value);

  const handleLoginFailure = (res) => {
    setLoginFailCount(loginFailCount + 1);
    setErrorMessage(
      `이메일 또는 비밀번호가 ${loginFailCount}회 틀렸습니다. 5회 도달시 비밀번호를 재설정 해야 합니다`
    );
    console.log(res)
    if (res.data.status === 404) {
      setErrorMessage("존재하지 않는 회원입니다.");
    } else if (res.data.status === 400) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("누구세요?")
    }
  };
  
  const handleLoginSuccess = (res) => {
    setLoginFailCount(0);
    const accessToken = res.headers['Access_Token']
    const refreshToken = res.headers['Refresh_Token']
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.defaults.headers.common['Refresh-Token'] = refreshToken;
    document.location.href = "/";
  };
  
  const onClickLogin = () => {
    if (loginFailCount >= 5) {
      setErrorMessage(
        "가능한 횟수를 초과하였습니다. 비밀번호를 재 설정 해주세요"
        );
        return;
      }
      requestPost(`member/login`, {
        email: inputId,
        password: inputPw,
      })
      .then((res) => {
        if (res.status === 200) {
          handleLoginSuccess(res);
        } else {
          handleLoginFailure(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSaveIDFlag = (e) => {
    setSaveIDFlag(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem(saveId, inputId);
      console.log(inputId)
    } else {
      localStorage.setItem(saveId, "");
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={onSubmitHandler}>
        <label className="coala" onClick={navigateToHome}>
          COALA
        </label>
        <div className="idBox">
          <label className="text">아이디</label>
          <input
            type="id"
            className="input"
            value={inputId}
            onChange={oninputIdHandler}
            placeholder="아이디"
          />
        </div>
        <div className="pwBox">
          <label className="text">비밀번호</label>
          <input
            type="password"
            className="input"
            value={inputPw}
            onChange={oninputPwHandler}
            placeholder="비밀번호"
          />
        </div>
        <div>
          <CCheckBox
            text={"아이디 저장"}
            checked={saveIdCheck}
            onChange={handleSaveIDFlag}
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button className="button" type="button" onClick={onClickLogin}>
          로그인
        </button>
        <div className="afterlogin">
          <label className="grey" onClick={navigateToSignUp}>
            회원가입
          </label>
          <label className="ho">|</label>
          <label className="grey" onClick={navigateToFindPw}>
            비밀번호 찾기
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
