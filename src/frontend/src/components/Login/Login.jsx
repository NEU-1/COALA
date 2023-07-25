import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
// import Check from "./Check"

export const Login = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("inputId", inputId);
    console.log("inputPw", inputPw);
  };

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const oninputIdHandler = (event) => {
    setInputId(event.currentTarget.value);
  };
  const oninputPwHandler = (event) => {
    setInputPw(event.currentTarget.value);
  };

  const onClickLogin = () => {
    console.log("click login");
    console.log("ID: ", inputId);
    console.log("PW: ", inputPw);
    axios
      .post("-로그인처리폼", null, {
        params: {
          user_id: inputId,
          user_pw: inputPw,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.userId :: ", res.data.userId);
        console.log("res.data.msg :: ", res.data.msg);
        if (res.data.userId == null) {
          console.log("======================", res.data.msg);
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data.msg === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.userId === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", inputId);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
      })
      .catch();
  };
  useEffect(() => {
    axios
      .get("-로그인 데이터 가져올곳")
      .then((res) => console.log(res))
      .catch();
  }, []);

  return (
    <div className="page">
      <form
        className="form"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <div className="coala">COALA</div>
        <label className="text">아이디</label>
        <input
          type="text"
          className="input"
          value={inputId}
          onChange={oninputIdHandler}
          placeholder="아이디"
        />
        <label className="text">비밀번호</label>
        <input
          type="inputPw"
          className="input"
          value={inputPw}
          onChange={oninputPwHandler}
          placeholder="비밀번호"
        />
        <div>
          <input type="checkbox" />
          <label className="check-Text"> 아이디 저장</label>
        </div>
        {/* 에러메시지 */}
        <button className="button" type="button" onClick={onClickLogin}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
