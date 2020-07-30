import React from "react";
import "./JobNotFound.css";

function JobNotFound(props) {
  return (
    <div className="job-not-found-container">
      <p>Error: Could not scrape job details</p>
      <span>Failed Url: </span>
      <span>
        <a target="_blank" rel="noopener noreferrer" href={props.jobLink}>
          {props.jobLink}
        </a>
      </span>
    </div>
  );
}

export default JobNotFound;
