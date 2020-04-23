import React from 'react';
import enhance from './InputWrapper';

function Input(props) {
  const { value, handleChange, handleKeyUp } = props;
  return (
    <input autoFocus
      type="text"
      className="form-control add-todo"
      value={value}
      onKeyUp={handleKeyUp}
      onChange={handleChange}
      placeholder="Add New"
    />
  );
}

export default enhance(Input);