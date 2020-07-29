import React, { useContext } from "react";
import "./JobListing.css";
import { withRouter } from "react-router-dom";
import DispatchContext from "../../../../context/DispatchContext";
// import StateContext from "../../../../context/StateContext";
import ReactMarkdown from "react-markdown";
// import LoadingDotsIcon from "../../../Utils/LoadingDots/LoadingDotsIcon";
import axios from "axios";
require("dotenv").config();

function JobListing(props) {
  const appDispatch = useContext(DispatchContext);
  // const appState = useContext(StateContext);

  async function handleJobListingClick(event) {
    event.preventDefault();
    appDispatch({ type: "APP_IS_LOADING", value: true });

    try {
      const response = await axios.get("/find-job", {
        params: {
          url: `https://${props.jobUrl}`,
          jobTitle: props.jobTitle,
          companyName: props.companyName,
          postedDate: props.postedDate,
          jobLocation: props.jobLocation,
        },
      });
      console.log(response);
      appDispatch({ type: "APP_NOT_LOADING", value: false });
      appDispatch({ type: "JOB_LISTING_CLICK", job: response.data });

      //console.log(event.target);
      // appDispatch({ type: "ACTIVE_JOB_JOB_LISTING_COORDINATES", x: event.target.screenX, y: event.target.screenY });
      /*Can't access event.target.screenX or screenY for some reason. What I want to happen is when the back to search arrow is clicked with the JobDetailsComponent, I want to scroll down to this job listing, using the coordinates contained in global state JOB_LISTING_CLICK. The scroll should occur within JobListings.js */

      props.history.push(`${props.location.pathname}/${props.jobId}`);
    } catch (err) {
      console.log(err);
    }
  }

  // if (appState.isLoading)
  //   return (
  //     <div className="loading-dots-container">
  //       <LoadingDotsIcon />
  //     </div>
  //   );

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

export default withRouter(JobListing);
