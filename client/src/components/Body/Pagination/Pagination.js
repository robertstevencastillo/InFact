import React, { useState, useContext } from "react";
import "./Pagination.css";
import StateContext from "../../../context/StateContext";

function Pagination(props) {
  const pageNumbers = [];
  const appState = useContext(StateContext);
  const [activePage, setActivePage] = useState(appState.activePage);
  for (let x = 1; x <= Math.ceil(props.totalJobs / props.jobsPerPage); x++) {
    pageNumbers.push(x);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => {
          return activePage === number ? (
            <li key={number} className="page-item active-page">
              <a
                onClick={event => {
                  event.preventDefault();
                  props.paginate(number);
                  setActivePage(number);
                }}
                href="!#"
                className={"page-link"}
              >
                {number}
              </a>
            </li>
          ) : (
            <li key={number} className="page-item">
              <a
                onClick={event => {
                  event.preventDefault();
                  props.paginate(number);
                  setActivePage(number);
                }}
                href="!#"
                className={"page-link"}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;

// implemented pagination functionality from this Brad Traversy Video - https://www.youtube.com/watch?v=IYCa1F-OWmk
