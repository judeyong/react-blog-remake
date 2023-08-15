import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Input from "../shared/ui/Input";
import Button from "../shared/ui/Button";
import { AppContexts } from "../shared/context/auth-context";

import "./Auth.css";
const TEMP_IMAGE =
  "https://as1.ftcdn.net/v2/jpg/06/19/26/46/1000_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.webp";

let emailDuplicate = "";

const Auth = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [disabledBtnHandler, setDisableBtndHandler] = useState(true);
  const [isTouched, setIsTouched] = useState({
    name: false,
    email: false,
    password: false
  });
  const auth = useContext(AppContexts);
  const history = useHistory();

  const onSubmitBtn = (event) => {
    event.preventDefault();
    emailDuplicate = "";
    const loginUserInfo = auth.users.filter((element) => {
      return element.email === email;
    });
    //console.log("loginUserInfo ", loginUserInfo);

    if (signUpMode) {
      //회원가입
      if (loginUserInfo.length > 0) {
        //회원가입시 이메일이 이미 존재함
        setIsValid((prevState) => {
          return { ...prevState, email: false };
        });
        emailDuplicate = "중복된 이메일입니다.";
      } else {
        auth.ADD_USER({
          id: String(Date.now()),
          email: email,
          name: name,
          image: TEMP_IMAGE,
          postCnt: 0,
        });
        setName("");
        setEmail("");
        setPassword("");
        setSignUpMode(false);
        setIsValid({
          name: false,
          email: false,
          password: false
        });
        setIsTouched({
          name: false,
          email: false,
          password: false
        });
        history.push("/auth");
        emailDuplicate ="";
      }
    } else {
      //로그인
      if (loginUserInfo.length === 0) {
        //같은 이메일 존재하지 않음
        setIsValid((prevState) => {
          return { ...prevState, email: false };
        });
        emailDuplicate = "존재하지 않는 이메일입니다.";
      } else {
        //같은 이메일 존재함 로그인
        auth.LOGIN_FUNC(loginUserInfo[0]);
        //console.log(auth.isLoggedIn);
        setEmail("");
        setPassword("");
        emailDuplicate ="";
        history.push("/");
      }
    }
  };

  const changeLoginMode = () => {
    setSignUpMode(true);
    setEmail("");
    setPassword("");
    setIsTouched({
      name: false,
      email: false,
      password: false
    });
    emailDuplicate ="";
  };

  const signupCancelHandler = () => {
    setSignUpMode(false);
    setEmail("");
    setPassword("");
    setName("");
    emailDuplicate ="";
  };

  useEffect(() => {
    if (signUpMode && isValid.email && isValid.password && isValid.name) {
      setDisableBtndHandler(false);
    } else if (!signUpMode && isValid.email && isValid.password) {
      setDisableBtndHandler(false);
    } else {
      setDisableBtndHandler(true);
    }
  }, [isValid.email, isValid.password, isValid.name, signUpMode]);

  return (
    <div className="auth-form">
      <h1>로그인</h1>
      <hr />
      <form onSubmit={onSubmitBtn} className="auth-from__form">
        {signUpMode && (
          <Input
            element="input"
            id="name"
            label="이름"
            type="text"
            placeholder="이름을 입력하세요."
            errorText="공백을 허용하지 않습니다."
            state={name}
            setFunc={setName}
            isValid={isValid}
            setIsValid={setIsValid}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
          />
        )}
        <Input
          element="input"
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요."
          errorText={
            emailDuplicate === ""
              ? "사용 가능한 이메일이 아닙니다."
              : emailDuplicate
          }
          state={email}
          setFunc={setEmail}
          isValid={isValid}
          setIsValid={setIsValid}
          isTouched={isTouched}
          setIsTouched={setIsTouched}
        />
        <Input
          element="input"
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요."
          errorText="5자 이상 입력해 주세요."
          state={password}
          setFunc={setPassword}
          isValid={isValid}
          setIsValid={setIsValid}
          isTouched={isTouched}
          setIsTouched={setIsTouched}
        />
        <div className="magin-bot">
          <Button
            type="submit"
            onClick={onSubmitBtn}
            disabled={disabledBtnHandler}
          >
            {signUpMode ? "회원가입" : "로그인"}
          </Button>
          {signUpMode && <Button onClick={signupCancelHandler}>취소</Button>}
          {signUpMode || <Button onClick={changeLoginMode}>회원가입</Button>}
        </div>
      </form>
    </div>
  );
};

export default Auth;
