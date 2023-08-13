import React, { useEffect } from "react";

import { validate } from "../customhooks/validate";

import "./Input.css";

const Input = (props) => {
  
  const { id, state, setFunc, isValid, setIsValid, isTouched, setIsTouched } =
    props;

  const onChageInput = (event) => {
    setFunc(event.target.value);
  };

  const touchHandler = () => {
    setIsTouched((prevState) => {
      return { ...prevState, [id]: true };
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder || ""}
        value={state}
        onChange={onChageInput}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 10}
        placeholder={props.placeholder || ""}
        value={state}
        onChange={onChageInput}
        onBlur={touchHandler}
      />
    );
  //console.log(state);

  useEffect(() => {
    setIsValid((prevState) => {
      return { ...prevState, [id]: validate(state, id) };
    });
  }, [state, id]);

  //console.log(validate(state, props.id));
  //console.log(props.id ,props.isValid[props.id]);

  return (
    <div className="Input-form">
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!isValid[id] && isTouched[id] && <p>{props.errorText}</p>}
    </div>
  );
};

Input.defaultProps = {
  setIsValid: () => {},
};

export default Input;
