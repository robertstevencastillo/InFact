import React, { useState, useContext } from "react";
import "./SearchJob.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import LoadingDotsIcon from "../../Utils/LoadingDots/LoadingDotsIcon";
import DispatchContext from "../../../context/DispatchContext";
require("dotenv").config();

function SearchJob(props) {
  const searchJobString = `https://lovely-glacier-19877.herokuapp.com/https://jobs.github.com/positions.json?${process.env.REACT_APP_GH_CLIENT_KEY}&${process.env.REACT_APP_GH_CLIENT_SECRET}`;
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const appDispatch = useContext(DispatchContext);

  function handleJobTitleInput(event) {
    setJobTitle(event.target.value);
  }

  function handleJobLocationInput(event) {
    setJobLocation(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`${searchJobString}&description=${jobTitle}&location=${jobLocation}&full_time=true&markdown=true`);
      setIsLoading(false);

      if (response.data.length === 0) {
        console.log("no results");
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "No Results Found",
        });
        setJobTitle("");
        setJobLocation("");
      } else {
        setJobTitle("");
        setJobLocation("");
        console.log(response);
        props.handleJobResults(response.data);
        props.history.push("/job-listings");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading)
    return (
      <div className="loading-dots-container">
        <LoadingDotsIcon />
      </div>
    );

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
