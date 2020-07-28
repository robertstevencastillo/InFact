import React, { useContext } from "react";
import "./JobListing.css";
import { withRouter } from "react-router-dom";
import DispatchContext from "../../../../context/DispatchContext";
import ReactMarkdown from "react-markdown";
import axios from "axios";
require("dotenv").config();

function JobListing(props) {
  const appDispatch = useContext(DispatchContext);
  const searchJobString = `${process.env.REACT_APP_CORS_PROXY}https://www.themuse.com/api/public/jobs/`;

  // async function handleJobListingClick(event) {
  //   // const tempJob = {
  //   //   jobId: props.jobId,
  //   //   jobTitle: props.jobTitle,
  //   //   companyName: props.companyName,
  //   //   jobLocation: props.jobLocation,
  //   //   postedDate: props.postedDate,
  //   // };

  //   const job = getJobDetails(props.jobId).then(data => data);
  //   console.log(job);
  //   appDispatch({ type: "JOB_LISTING_CLICK", job: job });
  //   //props.history.push(`${props.location.pathname}/${props.job_id}`);
  // }

  async function handleJobListingClick(event) {
    event.preventDefault();
    try {
      const response = await axios.get(`${searchJobString}${props.jobId}?api_key=${process.env.REACT_APP_MUSE_API_KEY}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "access-control-allow-origin",
        },
      });
      appDispatch({ type: "JOB_LISTING_CLICK", job: response.data });
      props.history.push(`${props.location.pathname}/${props.jobId}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="job-listing-container" onClick={handleJobListingClick}>
      <div>
        {/* <strong>{props.jobTitle}</strong> */}
        <h3>
          <ReactMarkdown source={props.jobTitle} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
        </h3>
        <h4>
          <ReactMarkdown source={props.companyName} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
        </h4>
        <p>{props.jobLocation}</p>
        <p>{props.postedDate}</p>
      </div>
    </div>
  );
}

export default withRouter(JobListing);

/* 
GitHub Job Properties
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

    GIthub return ()
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
*/
