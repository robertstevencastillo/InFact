import React, { useContext } from "react";
import "./SavedJobs.css";
import { withRouter } from "react-router-dom";
import StateContext from "../../../context/StateContext";
import SavedJob from "./SavedJob";
import DispatchContext from "../../../context/DispatchContext";

function SavedJobs(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleViewJobDetailsClick(job) {
    appDispatch({ type: "JOB_LISTING_CLICK", job });
    props.history.push(`job-listings/${job.jobId}`);
  }

  return (
    <div className="saved-jobs-page-container">
      <div className="saved-jobs-container">
        {appState.savedJobs < 1 ? (
          <div>No Saved Jobs...</div>
        ) : (
          appState.savedJobs.map(job => {
            return <SavedJob handleViewJobDetailsClick={() => handleViewJobDetailsClick(job)} key={job.jobId} jobId={job.jobId} jobTitle={job.jobTitle} companyName={job.companyName} jobLocation={job.jobLocation} postedDate={job.postedDate} jobSummary={job.jobSummary} />;
          })
        )}
      </div>
    </div>
  );
}

export default withRouter(SavedJobs);

// <p>
//   <strong>{props.jobTitle}</strong>
// </p>
//   <p>{props.companyName}</p>
//   <p>- {props.jobLocation}</p>
//   <p>{props.postedDate}</p>
//   <p>{props.jobSummary}</p>
