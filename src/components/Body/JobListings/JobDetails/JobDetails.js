import React, { useContext } from "react";
import StateContext from "../../../../context/StateContext";
import ReactMarkdown from "react-markdown";
import "./JobDetails.css";
import JobDetailsAside from "./JobDetailsAside";

function JobDetails(props) {
  const appState = useContext(StateContext);
  const job = appState.clickedJob;
  const date = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  return (
    <div className="job-details-page-container">
      <JobDetailsAside howToApplyToJob={job.jobApplicationSteps} />
      <div className="job-details-container">
        <h2>{job.jobTitle}</h2>
        <span>{job.jobType}</span>
        <p>Posted {Math.round(Math.abs((date - new Date(job.postedDate)) / oneDay))} days ago</p>
        <span>
          {" "}
          <img className="job-details-company-logo" alt="company logo" src={job.companyLogo} />
        </span>
        <span>{job.companyName}</span>
        <span>{job.jobLocation}</span>
        <button className="job-details-apply-button">
          {" "}
          <a target="_blank" rel="noopener noreferrer" href={job.jobUrl}>
            Apply
          </a>{" "}
        </button>
        <ReactMarkdown source={job.jobDescription} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
        <JobDetailsAside howToApplyToJob={job.jobApplicationSteps} />
      </div>
    </div>
  );
}

export default JobDetails;

/*if days ago is greather than 365 subtract in years, if less 365 use days */
