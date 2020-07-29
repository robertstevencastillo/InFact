import React, { useContext } from "react";
import StateContext from "../../../../context/StateContext";
import "./JobDetails.css";
import JobDetailsAside from "./JobDetailsAside";

function JobDetails(props) {
  const appState = useContext(StateContext);
  const job = { ...appState.clickedJob };

  function jobContentsMarkup() {
    return { __html: job.jobData.jobBody };
  }

  return (
    <div className="job-details-page-container">
      <JobDetailsAside />
      <div className="job-details-container">
        <h2>{job.JobTitle === null ? "N/A" : job.jobTitle}</h2>
        <h3>{job.companyName === null ? "N/A" : job.companyName}</h3>
        <span>{job.jobLocation === null ? "N/A" : job.jobLocation}</span>
        <p>{job.postedDate === null ? "N/A" : job.postedDate}</p>

        <button className="job-details-apply-button">
          {" "}
          <a target="_blank" rel="noopener noreferrer" href={job.url}>
            Apply
          </a>{" "}
        </button>
        <div dangerouslySetInnerHTML={jobContentsMarkup()} />
        <JobDetailsAside />
      </div>
    </div>
  );
}

export default JobDetails;

/*if days ago is greather than 365 subtract in years, if less 365 use days */

/* 
  const date = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

Old Return 
  return (
    <div className="job-details-page-container">
      <JobDetailsAside />
      <div className="job-details-container">
        <h3>
          <ReactMarkdown source={job.name} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
        </h3>
        <h2>{job.jobTitle}</h2>
        <p>Posted {Math.round(Math.abs((date - new Date(job.publication_date)) / oneDay))} days ago</p>
        <span>
          <strong>{job.company.name}</strong>
        </span>
        <span>{job.locations[0].name}</span>
        <button className="job-details-apply-button">
          {" "}
          <a target="_blank" rel="noopener noreferrer" href={job.refs.landing_page}>
            Apply
          </a>{" "}
        </button>
        <div dangerouslySetInnerHTML={jobContentsMarkup()} />
        <JobDetailsAside />
      </div>
    </div>
  );
*/
