import React, { useContext } from "react";
import "./JobListing.css";
import { withRouter } from "react-router-dom";
import DispatchContext from "../../../../context/DispatchContext";

function JobListing(props) {
  const appDispatch = useContext(DispatchContext);

  function handleJobListingClick(event) {
    props.history.push(`${props.location.pathname}/${props.job_id}`);
    const job = {
      companyLogo: props.companyLogo,
      jobTitle: props.jobTitle,
      companyName: props.companyName,
      jobLocation: props.jobLocation,
      jobType: props.jobType,
      postedDate: props.postedDate,
      jobId: props.job_id,
      jobDescription: props.jobDescription,
      jobUrl: props.jobUrl,
      jobApplicationSteps: props.jobApplicationSteps,
    };

    appDispatch({ type: "JOB_LISTING_CLICK", job: job });
  }
  return (
    <div className="job-listing-container" onClick={handleJobListingClick}>
      <span className="job-listing-company-logo-span">
        <img className="job-listing-company-logo" alt="logo" src={props.companyLogo} />
      </span>
      <div>
        <p>
          <strong>{props.jobTitle}</strong>
        </p>
        <p>{props.companyName}</p>
        <p>{props.jobLocation}</p>
        <p>{props.jobType}</p>
        <p>{props.postedDate}</p>
      </div>
    </div>
  );
}

export default withRouter(JobListing);
