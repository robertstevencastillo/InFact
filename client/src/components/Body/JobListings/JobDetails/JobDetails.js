import React, { useContext, useState, useEffect } from "react";
import StateContext from "../../../../context/StateContext";
import DispatchContext from "../../../../context/DispatchContext";
import "./JobDetails.css";
import JobDetailsAside from "./JobDetailsAside";
import JobNotFound from "../../JobNotFound/JobNotFound";

function JobDetails(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const job = { ...appState.clickedJob };

  useEffect(() => {
    if (appState.savedJobs > 0) {
      appState.savedJobs.forEach(savedJob => {
        console.log("We Got Saved Jobs");
        if ((savedJob.jobTitle === job.jobTitle && savedJob.companyName === job.companyName) || savedJob.jobTitle === job.jobTitle) {
          console.log("Job is saved");
          setIsJobSaved(true);
          return;
        } else {
          console.log("Job not saved");
          setIsJobSaved(false);
        }
      });
    }

    if (job.jobSaved === true) {
      setIsJobSaved(true);
    } else {
      setIsJobSaved(false);
    }
  }, []);

  function handleSaveJobClick(event) {
    event.preventDefault();
    appDispatch({ type: "SAVE_JOB", job });
    setIsJobSaved(true);
  }

  function jobContentsMarkup() {
    return { __html: job.jobData.jobBody };
  }

  return (
    <div className="job-details-page-container">
      <JobDetailsAside />
      {!("jobData" in job) ? (
        <JobNotFound jobLink={job.url} />
      ) : (
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

          {isJobSaved ? (
            <button className="job-details-save-job-button-disabled">Saved</button>
          ) : (
            <button onClick={handleSaveJobClick} className="job-details-save-job-button">
              Save
            </button>
          )}

          <div dangerouslySetInnerHTML={jobContentsMarkup()} />
          <JobDetailsAside />
        </div>
      )}
    </div>
  );
}

export default JobDetails;
