import React, { useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import CCheckBox from "../Common/CCheckBox";
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  getAccessToken,
  requestPost,
} from "../../lib/api/api";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../../store/LoginSlice";
import { useEffect } from "react";

const Login = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("inputId", inputId);
    console.log("inputPw", inputPw);
  };

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [loginFailCount, setLoginFailCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveIdCheck, setSaveIDFlag] = useState(false);
  const saveId = "saveId";

  const dispatch = useDispatch();

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

  const handleLoginFailure = (err) => {
    setLoginFailCount(loginFailCount + 1);

    if (err.response.status === 404) {
      setErrorMessage("존재하지 않는 회원입니다.");
    } else if (err.response.status === 400) {
      setErrorMessage(
        `비밀번호가 ${loginFailCount}회 틀렸습니다. 5회 도달시 비밀번호를 재설정 해야 합니다`
      );
    } else {
      setErrorMessage("누구세요?");
    }
  }
  useEffect(() => {
    if(localStorage.getItem(saveId)) {
      setInputId(localStorage.getItem(saveId));
    }
  }, [])
  

  const handleLoginSuccess = (res) => {
    setLoginFailCount(0);
    const accessToken = res.headers["access_token"];
    const refreshToken = res.headers["refresh_token"];
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem('login', true);
    setTimeout(getAccessToken, ACCESS_TOKEN_EXPIRE_TIME);
    // 전역 상태인 isLogin을 true로 설정
    dispatch(login());
    navigate("/", { replace: true });
  };

  const onClickLogin = () => {
    if(inputId && inputPw) {
      if (saveIdCheck) {
        localStorage.setItem(saveId, inputId);
        console.log(inputId);
      } else {
        localStorage.removeItem(saveId);
      }
      requestPost(`member/login`, {
        email: inputId,
        password: inputPw,
      })
        .then((res) => {
          console.log(res)
          if (res.data.statusCode === 200) {
            Swal.fire({
              icon: "success",
              title: "로그인 성공!",
              html: "",
              timer: 1000,
              showConfirmButton: false,
            }).then(() => {
              handleLoginSuccess(res);
            });
          }
        })
        .catch((err) => {
          if(err.response.data.statusCode === 400) {
            Swal.fire({
              icon: 'error',
              title: `<div style="font-size: 16px; font-weight: 700">${err.response.data.msg}</div>`,
              width: '350px'
            })
          } else if(err.response.data.status === 500) {
            Swal.fire({
              icon: 'error',
              title: `<div style="font-size: 16px; font-weight: 700">존재하지 않는 회원입니다.</div>`,
              width: '350px'
            })
          }
        });
    } else {
      if(!inputId) {
        Swal.fire({
          title: '<div style="font-size: 16px; font-weight: 700">아이디를 입력하세요.</div>',
          width: '350px'
        })
      }
      else {
        Swal.fire({
          title: '<div style="font-size: 16px; font-weight: 700">비밀번호를 입력하세요.</div>',
          width: '350px'
        })
      }
    }
  };

  const handleSaveIDFlag = (e) => {
    setSaveIDFlag(e.target.checked);
  };

  const onIdKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector(".input[type='password']").focus();
    }
  };

  const onPwKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClickLogin();
    }
  };

  useEffect(() => {
    if(localStorage.getItem(saveId)) {
      setSaveIDFlag(true);
      setInputId(localStorage.getItem(saveId));
    }
  }, [])
  

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
            onKeyDown={onIdKeyDownHandler}
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
            onKeyDown={onPwKeyDownHandler}
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
