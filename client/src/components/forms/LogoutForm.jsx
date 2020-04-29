import React from "react";

export default props => {
  // extract props here to avoid repetitious typing
  return (
    <div className="user-form-container">
      <h2>Logout</h2>
      <form className='logout'>
        <button type="submit" onClick={props.handleLogout}>
          Log Out
        </button>
        <button type="submit" onClick={() => this.props.history.push(`/home`)}>
          Cancel
        </button>
      </form>
    </div>
  );
};