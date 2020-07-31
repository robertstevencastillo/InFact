import React, { useState, useContext } from "react";
import "./JobListings.css";
import JobListing from "./JobListing/JobListing";
import LoadingDotsIcon from "../../Utils/LoadingDots/LoadingDotsIcon";
import Pagination from "../Pagination/Pagination";
import StateContext from "../../../context/StateContext";
import DispatchContext from "../../../context/DispatchContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { withRouter } from "react-router-dom";

function JobListings(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  // const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  //Setting up pagination
  // const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfLastJob = appState.activePage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = appState.jobResults.slice(indexOfFirstJob, indexOfLastJob);

  //Change Page
  function paginate(pageNumber) {
    // setCurrentPage(pageNumber);
    appDispatch({ type: "ACTIVE_JOB_LISTINGS_PAGE", activePage: pageNumber });
  }

  async function handleJobListingClick(jobClicked) {
    appDispatch({ type: "APP_IS_LOADING" });

    try {
      const response = await axios.get("/find-job", {
        params: {
          url: jobClicked.url,
          jobId: jobClicked.jobId,
          jobTitle: jobClicked.jobTitle,
          companyName: jobClicked.companyName,
          postedDate: jobClicked.postedDate,
          jobLocation: jobClicked.jobLocation,
          jobSummary: jobClicked.jobSummary,
          jobSaved: false,
        },
      });

      appDispatch({ type: "APP_NOT_LOADING" });

      const isSaved = hasJobBeenAlreadySaved(response.data);
      if (isSaved) {
        let savedJob = { ...response.data };
        savedJob.jobSaved = true;
        appDispatch({ type: "JOB_LISTING_CLICK", job: savedJob });
      } else {
        appDispatch({ type: "JOB_LISTING_CLICK", job: response.data });
      }

      props.history.push(`${props.location.pathname}/${response.data.jobId}`);
    } catch (err) {
      console.log(err);
    }
  }

  function hasJobBeenAlreadySaved(job) {
    let value = false;
    appState.savedJobs.forEach(savedJob => {
      if (savedJob.jobTitle === job.jobTitle && savedJob.companyName === job.companyName) {
        // console.log(job.jobTitle + " at " + job.companyName + " has already been saved");
        value = true;
      } else {
        // console.log(job.jobTitle + " at " + job.companyName + " has not been saved");
        value = false;
      }
    });
    return value;
  }

  // implemented pagination functionality from this Brad Traversy Video - https://www.youtube.com/watch?v=IYCa1F-OWmk
  return (
    <>
      {appState.jobResults.length < 1 ? (
        <div className="no-search-results-container">No Search Results...</div>
      ) : (
        <div className="job-listings-container">
          {appState.isLoading ? (
            <div className="loading-dots-container">
              <LoadingDotsIcon />
            </div>
          ) : (
            <div className="job-listings-job-results-container">
              <h2>Search Results</h2>
              {currentJobs.map((jobResult, index) => {
                return <JobListing key={index} jobId={uuidv4()} job={jobResult} jobTitle={jobResult.title} companyName={jobResult.company} jobLocation={jobResult.location} jobSalary={jobResult.salary} jobSummary={jobResult.summary} postedDate={jobResult.datePosted} url={jobResult.href} jobSaved={jobResult.jobSaved} handleJobListingClick={handleJobListingClick} />;
              })}
              <Pagination jobsPerPage={jobsPerPage} totalJobs={appState.jobResults.length} paginate={paginate} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default withRouter(JobListings);
