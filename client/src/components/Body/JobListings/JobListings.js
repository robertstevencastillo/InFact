import React, { useState, useContext } from "react";
import "./JobListings.css";
import JobListing from "./JobListing/JobListing";
//import JobListingSideBar from "./JobListingSidebar/JobListingSideBar";
import LoadingDotsIcon from "../../Utils/LoadingDots/LoadingDotsIcon";
import Pagination from "../Pagination/Pagination";
import StateContext from "../../../context/StateContext";
import DispatchContext from "../../../context/DispatchContext";
import { v4 as uuidv4 } from "uuid";

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
              {currentJobs.map((jobResult, index) => {
                return <JobListing key={index} jobId={uuidv4()} job={jobResult} jobTitle={jobResult.title} companyName={jobResult.company} jobLocation={jobResult.location} jobSalary={jobResult.salary} jobSummary={jobResult.summary} postedDate={jobResult.datePosted} jobUrl={jobResult.href} jobSaved={jobResult.jobSaved} />;
              })}
              <Pagination jobsPerPage={jobsPerPage} totalJobs={appState.jobResults.length} paginate={paginate} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default JobListings;
