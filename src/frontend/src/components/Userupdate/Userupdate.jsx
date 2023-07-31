import React,{ useCallback, useEffect, useReducer } from "react";


const Modify = ({ history }) => {
    const { user, userList } = useUserState();
    const dispatch = useUserDispatch();
    const [id, onChangeId] = useInput(user.userId);
    const [nowPwd, onChangeNowPwd] = useInput("");
    const [pwd, onChangePwd] = useInput("");
    const [confirmPwd, onChangeConfirmPwd] = useInput("");
    const [errorMessage, setErrorMessage] = useState({
      idError: "",
      pwdError: "",
      confirmPwdError: "",
    });
    const { idError, pwdError, confirmPwdError, nowPwdError } = errorMessage;
  
    const inputRegexs = {
      idReg: /^[A-za-z0-9]{5,15}$/g,
      pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
    };
    const validationCheck = useCallback((input, regex) => {
      let isValidate = false;
      if (input === "") {
        isValidate = false;
      } else if (regex.test(input)) {
        isValidate = true;
      } else {
        isValidate = false;
      }
      return isValidate;
    }, []);
  
    /* 아이디 체크 */
    useEffect(() => {
      const findUser = userList.find((user) => user.id === id);
  
      if ((!findUser && validationCheck(id, inputRegexs.idReg)) || id === "") {
        setErrorMessage({
          ...errorMessage,
          idError: "",
        });
      } else if (findUser !== undefined) {
        setErrorMessage({
          ...errorMessage,
          idError: "이미 가입된 아이디입니다.",
        });
      } else if (!validationCheck(id, inputRegexs.idReg)) {
        setErrorMessage({
          ...errorMessage,
          idError: "아이디는 영문 또는 숫자로 5~15자 이여야 합니다.",
        });
      }
    }, [id]);
  
    /* 현재 비밀번호 체크 */
    useEffect(() => {
      if (user.userPwd === nowPwd || nowPwd === "") {
        setErrorMessage({
          ...errorMessage,
          nowPwdError: "",
        });
      } else {
        setErrorMessage({
          ...errorMessage,
          nowPwdError: "현재 비밀번호와 일치하지 않습니다.",
        });
      }
    }, [nowPwd]);
    /* 새 비밀번호 체크 */
    useEffect(() => {
      if (validationCheck(pwd, inputRegexs.pwdReg) || pwd === "") {
        setErrorMessage({
          ...errorMessage,
          pwdError: "",
        });
      } else {
        setErrorMessage({
          ...errorMessage,
          pwdError:
            "비밀번호는 최소 하나의 문자 및 하나의 숫자로 8자 이상이여야 합니다.",
        });
      }
    }, [pwd]);
    /* 새 비밀번호 확인 체크 */
    useEffect(() => {
      if (pwd === confirmPwd || confirmPwd === "") {
        setErrorMessage({
          ...errorMessage,
          confirmPwdError: "",
        });
      } else {
        setErrorMessage({
          ...errorMessage,
          confirmPwdError: "비밀번호 확인이 일치하지 않습니다.",
        });
      }
    }, [confirmPwd]);
  
    const onModify = () => {
      if (!id || !pwd || !confirmPwd || !nowPwd) {
        alert("모든 값을 정확하게 입력해주세요");
        return;
      }
  
      if (idError) {
        alert("아이디가 형식에 맞지 않습니다");
        return;
      } else if (nowPwdError) {
        alert("현재 비밀번호와 일치하지 않습니다.");
        return;
      } else if (pwdError) {
        alert("비밀번호가 형식에 맞지 않습니다");
        return;
      } else if (confirmPwdError) {
        alert("비밀번호 확인이 일치하지 않습니다.");
        return;
      }
      const index = userList.findIndex((x) => x.id === user.userId);
  
      dispatch({
        type: "MODIFY",
        index: index,
        userId: id,
        userPwd: pwd,
      });
     
      alert("수정을 완료했습니다.");
      history.push("/mypage");
    };
  
    return (
      <Container>
        <Title>정보 수정</Title>
        <UserInfo>
          <InfoItem>
            <InfoTitle>아이디 : </InfoTitle>
            <Value type="text" value={id} onChange={onChangeId} />
          </InfoItem>
          {idError ? <ErrorMessage>{idError}</ErrorMessage> : ""}
          <InfoItem>
            <InfoTitle>현재 비밀번호 : </InfoTitle>
            <Value type="password" value={nowPwd} onChange={onChangeNowPwd} />
          </InfoItem>
          {nowPwdError ? <ErrorMessage>{nowPwdError}</ErrorMessage> : ""}
          <InfoItem>
            <InfoTitle>새 비밀번호 : </InfoTitle>
            <Value type="password" value={pwd} onChange={onChangePwd} />
          </InfoItem>
          {pwdError ? <ErrorMessage>{pwdError}</ErrorMessage> : ""}
          <InfoItem>
            <InfoTitle>새 비밀번호 확인: </InfoTitle>
            <Value
              type="password"
              value={confirmPwd}
              onChange={onChangeConfirmPwd}
            />
          </InfoItem>
          {confirmPwdError ? <ErrorMessage>{confirmPwdError}</ErrorMessage> : ""}
        </UserInfo>
        <Btn type="submit" value="수정 완료" onClick={onModify} />
      </Container>
    );
  };