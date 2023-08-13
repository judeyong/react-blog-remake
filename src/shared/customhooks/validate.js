
export const validate = (value, id, defalutValue = 5) => {
  let isValid = true;
  if (id === 'name') {
    isValid = isValid && value.trim().length > 0;
  }
  if (id === 'password') {
    isValid = isValid && value.trim().length >= defalutValue;
  }
  if (id === 'email') {
    isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
  }
  if (id === 'title') {
    isValid = isValid && value.trim().length >= defalutValue;
  }
  if (id === 'description') {
    defalutValue = 5;
    isValid = isValid && value.trim().length >= defalutValue;
  }
  return isValid;
};
