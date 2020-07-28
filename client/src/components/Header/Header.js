import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <header className="header-container">
      <Link to={"/"} className="header-logo">
        InFact
      </Link>
      <Link to={"/"}>Find Jobs</Link>
      <Link to={"/company-reviews"}>Company Reviews</Link>
    </header>
  );
}

export default Header;
