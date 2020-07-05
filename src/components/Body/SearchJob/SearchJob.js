import React, { useState } from "react";
import "./SearchJob.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

function SearchJob(props) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  function handleJobTitleInput(event) {
    setJobTitle(event.target.value);
  }

  function handleJobLocationInput(event) {
    setJobLocation(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(`https://jobs.github.com/positions.json?description=${jobTitle}&location=${jobLocation}`);
      console.log(response);
    } catch (err) {
      console.log("Error is : " + err);
    }

    props.history.push("/job-listings");
  }

  return (
    <section className="search-job-container">
      <form className="search-job-form" onSubmit={handleFormSubmit}>
        <div className="search-job-form-inputs search-job-form-inputs-job">
          <label>What</label>
          <input placeholder="Job title, keywords" value={jobTitle} onChange={handleJobTitleInput}></input>
        </div>
        <div className="search-job-form-inputs search-job-form-inputs-location">
          <label>Where</label>
          <input placeholder="Country, city, state, zip code " value={jobLocation} onChange={handleJobLocationInput}></input>
        </div>
        <button className="search-job-form-button">Find Jobs</button>
      </form>
    </section>
  );
}

export default withRouter(SearchJob);
