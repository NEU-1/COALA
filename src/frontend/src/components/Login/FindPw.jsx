import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CertificationTimer from "./CertificationTimer";
import { requestPost } from "../../lib/api/api";
import Swal from "sweetalert2";

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
  const [turnOnTimer, setTurnOnTimer] = useState(false);

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
    setTurnOnTimer(true);

    const showAlert = (icon, title) => {
      setTimeout(() => {
        Swal.fire({
          icon,
          title,
          html: "",
          timer: 1000,
          showConfirmButton: false,
        });
      }, 300);
    };
    if (!email) {
      showAlert("warning", "이메일 칸이 비어있습니다.\n이메일을 입력해주세요.");
      return false;
    }
    if (!name) {
      showAlert("warning", "이메일 칸이 비어있습니다.\n이메일을 입력해주세요.");
      return false;
    }
    if (!name) {
      showAlert("warning", "이름 칸이 비어있습니다.\n이름을 입력해주세요.");
      return false;
    }
    if (!studentId) {
      showAlert("warning", "학번 칸이 비어있습니다.\n학번을 입력해주세요.");
      return false;
    }

    if (email) {
      Swal.fire({
        title: "잠시 기다려 주세요...",
        html: "",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      requestPost("member/findpassword", {
        email: email,
        name: name,
        studentId: studentId,
        type: "find",
      })
        .then((res) => {
          showAlert(
            "success",
            `${email}로\n인증번호가 전송되었습니다.`
          );
          console.log(res);
          setSendCertification(true);
        })
        .catch((err) => {
          let errorMessage;
          if (err.response.status === 404) {
            errorMessage = "존재하지 않는 회원입니다.";
          } else if (err.response.status === 400) {
            errorMessage = "이름 또는 학번이 일치하지 않습니다.";
          } else if (err.response.status === 500) {
            errorMessage = "실패. 나중에 다시 시도해주세요.";
          }
          showAlert("error", errorMessage);
          console.log(err);
        });
    }
  };

  const onCheckCertification = async (e) => {
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
  
    try {
      const res = await requestPost("member/certification", {
        email: email,
        otp: certification,
        type: "find",
      });
      showAlert("success", "인증이 완료되었습니다.<br/>비밀번호를 변경해주세요.");
      navigate("/changepw");
    } catch (err) {
      let errorMessage;
      if (err.response.status === 404) {
        errorMessage = "인증번호가 일치하지 않습니다.";
      } else if (err.response.status === 500) {
        errorMessage = "인증번호가 존재하지 않습니다.<br/>다시 시도해 주세요";
      }
      showAlert("error", errorMessage);
      console.log(err);
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
        <div className="inputWithBtn">
          <input
            type="id"
            value={studentId}
            onChange={onStudentIdHandler}
            placeholder="학번"
          />
          <button type="button" onClick={onCallCertification}>
            인증번호 발송
          </button>
        </div>
        {sendCertification && (
          <div className="inputWithBtn">
            <div className="certificationInput">
              <input
                type="id"
                value={certification}
                onChange={oncertificationHandler}
                placeholder="인증번호"
              />
              {turnOnTimer && (
                <CertificationTimer setTurnOnTimer={setTurnOnTimer} />
              )}
            </div>
            <button type="button" onClick={onCheckCertification}>
              인증
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default FindPw;
