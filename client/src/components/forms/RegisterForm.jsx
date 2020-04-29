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
      <div className="container">
        <div className="row">
          <form className="form">
            <h2>{title}</h2>
            <div>
              <input
                type="text"
                onChange={onChange}
                name="email"
                id="email"
                value={email}
                placeholder="Enter your email"
              />
            </div>
            <div>
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
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>
              {submitButtonText}
            </button>
            <button type="submit" className="btn btn-primary" onClick={onClick}>
              {backButtonText}
            </button>
          </form>
        </div>
      </div>
    )
  );
};
