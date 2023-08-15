import React, { useEffect, useState } from "react";

import "./UpdatePost.css";

const UpdatePost = (props) => {
  const initialValue = {
    id: props.selectedElements.creator,
    title: props.selectedElements.title,
    description: props.selectedElements.description,
  };

  const { updateInputs, setUpdateInputs, updateInputsValid, setUpdateInputsValid } = props;

  const [updateErrText, setUpdateErrText] = useState(false);

  useEffect(() => {
    setUpdateInputs(initialValue);
  }, []);

  useEffect(() => {
    if(!updateInputsValid) {
      setUpdateErrText(false);
    }
    if (
      updateInputs.title.trim().length === 0 ||
      updateInputs.description.trim().length === 0
    ) {
      setUpdateInputsValid(true);
      setUpdateErrText(true);
    } else if (
      updateInputs.title !== initialValue.title ||
      updateInputs.description !== initialValue.description
    ) {
      setUpdateInputsValid(false);
      setUpdateErrText(false);
    } else {
      setUpdateInputsValid(true);
    }
  }, [updateInputs.title, updateInputs.description]);

  const onChangeUpdateHandler = (event) => {
    setUpdateInputs((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  //console.log("initial value", updateInputs);

  return (
    <div>
      {updateErrText && <p className='updateErrText'>공백을 허용하지 않습니다.</p>}
      <div className="update-title center">
        <label>제목</label>
        <input
          id={updateInputs.id}
          type="text"
          name="title"
          value={updateInputs.title}
          onChange={onChangeUpdateHandler}
        />
      </div>
      <div className="update-desc center">
        <label>본문</label>
        <textarea
          type="textarea"
          id={updateInputs.id}
          onChange={onChangeUpdateHandler}
          name="description"
          value={updateInputs.description}
          rows="5"
        />
      </div>
    </div>
  );
};

export default UpdatePost;
