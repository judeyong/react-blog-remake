import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../shared/ui/Card";
import Input from "../../shared/ui/Input";
import { AppContexts } from "../../shared/context/auth-context";
import Button from "../../shared/ui/Button";
import "./NewPost.css";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postBtnDisabled, setPostBtnDisabled] = useState(true);
  const [isPostValid, setIsPostValid] = useState({
    title: false,
    description: false,
  });
  const [isTouched, setIsTouched] = useState({
    title: false,
    description: false,
  });
  const postsInfo = useContext(AppContexts);

  const history = useHistory();

  const cancelHandler = () => {
    history.push("/");
  };

  const onPostHandler = (event) => {
    event.preventDefault();
    postsInfo.ADD_POSTS({
      email: postsInfo.loginEmail.email,
      title: postTitle,
      description: postDesc,
      date: new Date().toLocaleString(),
      creator: postsInfo.loginEmail.name,
      id: postsInfo.loginEmail.id,
    });
    postsInfo.users.map((element) => {
      if(element.email === postsInfo.loginEmail.email) {
        element.postCnt += 1;
      }
    });
    history.push("/");
  };

  useEffect(() => {
    if (isPostValid.title && isPostValid.description) {
      setPostBtnDisabled(false);
    } else {
      setPostBtnDisabled(true);
    }
  }, [isPostValid.title, isPostValid.description]);

  //console.log(postsInfo.loginEmail);

  return (
    <div className="center">
      <form className="newpost-form">
        <Card>
          <h2>새 글</h2>
          <Input
            element="input"
            id="title"
            label="글 제목"
            type="text"
            state={postTitle}
            setFunc={setPostTitle}
            isValid={isPostValid}
            setIsValid={setIsPostValid}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
            placeholder="글 제목을 입력하세요."
            errorText="5자 이상 입력해주세요."
          />
          <Input
            element="textarea"
            id="description"
            label="본문"
            type="textarea"
            state={postDesc}
            setFunc={setPostDesc}
            isValid={isPostValid}
            setIsValid={setIsPostValid}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
            placeholder="본문을 입력하세요."
            errorText="5자 이상 입력해주세요."
          />
          <div className="newpost-form__div-btn">
            <Button disabled={postBtnDisabled} onClick={onPostHandler}>
              게시하기
            </Button>
            <Button onClick={cancelHandler}>취소하기</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default NewPost;
