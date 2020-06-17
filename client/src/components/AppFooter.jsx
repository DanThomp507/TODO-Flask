import React from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  const { show, userData } = props;
  console.log(userData)
  return (
    <div className="footer">
      <div className="footer-text">
        {show && (
          <>
            <Link
              to={"/user/" + userData.id + "/username/" + userData.Name}
            >
              PROFILE
            </Link>
            <Link to="/logout">LOGOUT</Link>
          </>
        )}
        <Link to="/contact">CONTACT</Link>
        <a href="https://github.com/Mdellit110/subrats">github</a>
      </div>
    </div>
  );
};
export default Footer;
