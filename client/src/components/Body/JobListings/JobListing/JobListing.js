import React from "react";
import "./JobListing.css";
import ReactMarkdown from "react-markdown";

function JobListing(props) {
  function handleJobListingClick() {
    const jobClicked = {
      url: `https://${props.url}`,
      jobId: props.jobId,
      jobTitle: props.jobTitle,
      companyName: props.companyName,
      postedDate: props.postedDate,
      jobLocation: props.jobLocation,
      jobSummary: props.jobSummary,
      jobSaved: false,
    };

    props.handleJobListingClick(jobClicked);
  }

  return (
    <div className="job-listing-container" onClick={handleJobListingClick}>
      <div>
        <h3>
          <ReactMarkdown source={props.jobTitle} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
        </h3>
        <h4>
          <ReactMarkdown source={props.companyName} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
        </h4>
        <p>{props.jobLocation}</p>
        <p>
          <em>{props.jobSalary}</em>
        </p>
        <p>{props.jobSummary}</p>
        <p>Posted {props.postedDate}</p>
      </div>
    </div>
  );
}

export default JobListing;
