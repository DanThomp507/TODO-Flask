import React from "react";

export default props => {
  const { toggle, show, email, password, onChange, onSubmit, onClick } = props;
  const showLogin = !show && toggle;
  return (
    showLogin && (
      <div className="user-form-container">
        <form className='form'>
          <h2>Login</h2>
          <div>
            <input
              type="text"
              onChange={onChange}
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
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
          <button type="submit" onClick={onSubmit}>
            Sign In
          </button>
          <button type="submit" onClick={onClick}>
            Register
          </button>
        </form>
      </div>
    )
  );
};
