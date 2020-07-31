import React from "react";
import "./SavedJob.css";

function SavedJob(props) {
  function handleViewJobDetailsClick(event) {
    event.preventDefault();
    props.handleViewJobDetailsClick(props.job);
  }

  return (
    <div className="saved-job-container">
      <p>
        <strong>{props.jobTitle}</strong>
      </p>
      <p>{props.companyName}</p>
      <p>- {props.jobLocation}</p>
      <p>Posted {props.postedDate}</p>
      <p>{props.jobSummary}</p>
      <button onClick={handleViewJobDetailsClick}>View Job Details</button>
    </div>
  );
}

export default SavedJob;
