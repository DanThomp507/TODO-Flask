import React from "react";

export default props => {
  const { toggle, show, Email, password, onChange, onSubmit, onClick } = props;
  const showLogin = !show && toggle;
  return (
    showLogin && (
      <div className="container">
        <div className="row">
          <form className='form'>
            <h2>Login</h2>
            <div>
              <input
                type="text"
                onChange={onChange}
                name="Email"
                id="Email"
                placeholder="Enter your email"
                value={Email}
              />
            </div>
            <div>
              <input
                type="password"
                onChange={onChange}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>
              Sign In
          </button>
            <button type="submit" className="btn btn-primary" onClick={onClick}>
              Register
          </button>
          </form>
        </div>
      </div>
    )
  );
};
