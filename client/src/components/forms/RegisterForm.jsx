import React from "react";

export default props => {
  const {
    show,
    toggle,
    Email,
    password,
    onChange,
    onSubmit,
    onClick,
    submitButtonText,
    backButtonText,
    passwordAsk,
    title,
    userData,
    errors,
    Name
  } = props;

  const showRegister = !show && !toggle;
  console.log("register user form props", userData);
  console.log(errors)
  return (
    showRegister && (
      <div className="container">
        <div className="row">
          <form className="form register">
            <h2>{title}</h2>
            <div>
              <input
                type="text"
                onChange={onChange}
                name="Name"
                id="Name"
                value={Name}
                placeholder="Enter your Name"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={onChange}
                name="Email"
                id="Email"
                value={Email}
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
