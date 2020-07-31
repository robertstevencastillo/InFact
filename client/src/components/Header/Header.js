import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <header className="header-container">
      <Link to={"/"} className="header-logo">
        <img alt="InFact" src="https://www.infactcorp.com/wp-content/themes/infactcorp/images/infact.png"></img>
      </Link>
      <Link to={"/"}>Search Jobs</Link>
      {/* <Link to={"/company-reviews"}>Company Reviews</Link> */}
      <Link to={"/job-listings"}>Search Results</Link>
      <Link to={"/saved-jobs"}>Saved Jobs</Link>
    </header>
  );
}

export default Header;
