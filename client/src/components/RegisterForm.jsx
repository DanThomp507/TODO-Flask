import React from "react";

export default props => {
  const {
    show,
    toggle,
    email,
    password,
    onChange,
    onSubmit,
    onClick,
    submitButtonText,
    backButtonText,
    passwordAsk,
    title,
    userData
  } = props;

  const showRegister = !show && !toggle;
  console.log("register user form props", userData);
  return (
    showRegister && (
      <div className="user-form-container">
        <form className="form">
        <h2>{title}</h2>
        <div className="text-input-container">
          <div className="text-input">
            <input
              type="text"
              onChange={onChange}
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
            />
          </div>
          <div className="text-input">
            {passwordAsk && (
              <>
                <input
                  type="password"
                  onChange={onChange}
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Enter your Password"
                />
              </>
            )}
          </div>
        </div>
        <button type="submit" onClick={onSubmit}>
          {submitButtonText}
        </button>
        <button type="submit" onClick={onClick}>
          {backButtonText}
        </button>
      </form>
      </div>
    )
  );
};
