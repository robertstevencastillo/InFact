import React, { useState } from "react";
import "./JobListings.css";
import JobListing from "./JobListing/JobListing";
//import JobListingSideBar from "./JobListingSidebar/JobListingSideBar";
import Pagination from "../Pagination/Pagination";

function JobListings(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  const noImageAvailableUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png";

  //Setting up pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = props.jobResults.slice(indexOfFirstJob, indexOfLastJob);

  //Change Page
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  // implemented pagination functionality from this Brad Traversy Video - https://www.youtube.com/watch?v=IYCa1F-OWmk

  return (
    <div className="job-listings-container">
      <div className="job-listings-job-results-container">
        {currentJobs.map(jobResult => {
          return <JobListing key={jobResult.id} companyLogo={jobResult.company_logo == null ? noImageAvailableUrl : jobResult.company_logo} companyName={jobResult.company} jobTitle={jobResult.title} jobLocation={jobResult.location} jobType={jobResult.type} postedDate={jobResult.created_at} job_url={jobResult.url} job_id={jobResult.id} jobDescription={jobResult.description} jobUrl={jobResult.url} jobApplicationSteps={jobResult.how_to_apply} />;
        })}
        <Pagination jobsPerPage={jobsPerPage} totalJobs={props.jobResults.length} paginate={paginate} />
      </div>
    </div>
  );
}
export default JobListings;
