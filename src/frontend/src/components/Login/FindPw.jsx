import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindPw = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("email");
    console.log("name");
    console.log("studentId");
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [sendCertification, setSendCertification] = useState(false);
  const [certification, setCertification] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onStudentIdHandler = (e) => {
    setStudentId(e.currentTarget.value);
  };
  const oncertificationHandler = (e) => {
    setCertification(e.currentTarget.value);
  };



  const onCallCertification = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await axios.post("/api/send-email", { email });
        alert("Email sent");
      } catch (error) {
        console.error("Error sending email", error);
      }
      setSendCertification(true);
    } else {
      alert("이메일을 입력해주세요.");
    }
  };

  const onCheckCertification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/check-certification", {
        email,
        certification,
      });
      if (response.data.success) {
        alert('인증 완료!')
        navigate("/changepw");
      } else {
        alert("인증번호가 다릅니다");
      }
    } catch (error) {
      console.error("Error checking certification code", error);
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={onSubmitHandler}>
        <label className="coala" onClick={navigateToHome}>
          COALA
        </label>
        <input
          type="id"
          className="input"
          value={email}
          onChange={onEmailHandler}
          placeholder="이메일"
        />
        <input
          type="password"
          className="input"
          value={name}
          onChange={onNameHandler}
          placeholder="이름"
        />
        <input
          type="id"
          className="input"
          value={studentId}
          onChange={onStudentIdHandler}
          placeholder="학번"
        />
        <button className="button" type="button" onClick={onCallCertification}>
          인증번호 발송
        </button>
        {sendCertification && (
          <div>
            <input
              type="id"
              className="input"
              value={certification}
              onChange={oncertificationHandler}
              placeholder="인증번호"
            />
            <button
              className="button"
              type="button"
              onClick={onCheckCertification}
            >
              인증
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default FindPw;
