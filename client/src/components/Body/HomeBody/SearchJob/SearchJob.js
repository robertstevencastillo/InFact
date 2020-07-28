import React, { useState, useContext } from "react";
import "./SearchJob.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import LoadingDotsIcon from "../../../Utils/LoadingDots/LoadingDotsIcon";
import DispatchContext from "../../../../context/DispatchContext";
import StateContext from "../../../../context/StateContext";
const countryCityState = require("countrycitystatejson");
require("dotenv").config();

function SearchJob(props) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobState, setJobState] = useState("Pennsylvania");
  const [jobCity, setJobCity] = useState("Philadelphia");
  const [distance, setDistance] = useState(10);
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const searchJobString = `https://lovely-glacier-19877.herokuapp.com/http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_API_KEY}`;
  function handleJobTitleInput(event) {
    setJobTitle(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const jobLocation = jobCity === "" ? jobState : `${jobCity},${jobState}`;
    console.log(jobLocation);
    appDispatch({ type: "APP_IS_LOADING", value: true });
    const results = [];
    try {
      const response = await axios.get(`${searchJobString}&results_per_page=10&what=${jobTitle}&where=${jobLocation}&distance=${distance}content-type=application/json`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "access-control-allow-origin",
          "Content-Type": "application/json; charset=utf8",
        },
      });

      console.log(response);

      // results.push(...response.data.results);

      // if (response.data.page_count > 1) {
      //   for (let x = 1; x < 2 /*Math.ceil(response.data.page_count / 2) */; x++) {
      //     let apiResponse = await axios.get(`${searchJobString}&page=${x}&name=${jobTitle}&location=${jobLocation}`, {
      //       headers: {
      //         "X-Requested-With": "XMLHttpRequest",
      //         "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
      //         "Access-Control-Allow-Origin": "*",
      //         "Access-Control-Expose-Headers": "access-control-allow-origin",
      //       },
      //     });
      //     results.push(...apiResponse.data.results);
      //   }
      // }

      // appDispatch({ type: "APP_NOT_LOADING", value: false });

      // if (results.length === 0) {
      //   console.log("no results");
      //   appDispatch({
      //     type: "FLASH_MESSAGE",
      //     value: "No Results Found",
      //   });
      //   setJobTitle("");
      // } else {
      //   appDispatch({ type: "ADD_TO_RECENT_SEARCHES", jobTitle, jobLocation });
      //   appDispatch({ type: "SAVE_JOB_RESULTS", jobResults: results });
      //   setJobTitle("");
      //   props.history.push("/job-listings");
      // }
    } catch (err) {
      console.log(err);
    }
  }

  function handleStateCategoryChange(event) {
    event.preventDefault();
    setJobState(event.target.value);
  }

  function handleCityChange(event) {
    event.preventDefault();
    setJobCity(event.target.value);
  }

  function handleDistanceChange(event) {
    event.preventDefault();
    var kilometers = Number(event.target.value * 1.6);
    setDistance(kilometers);
  }

  if (appState.isLoading)
    return (
      <div className="loading-dots-container">
        <LoadingDotsIcon />
      </div>
    );

  return (
    <>
      <section className="search-job-container">
        <form className="search-job-form" onSubmit={handleFormSubmit}>
          <div className="search-job-form-inputs search-job-form-inputs-job">
            <label>What</label>
            <input placeholder="Job title, keywords" value={jobTitle} onChange={handleJobTitleInput}></input>
          </div>

          {/* <div className="search-job-form-inputs search-job-form-inputs-location">
            <label>Where</label>
            <input placeholder="Country, city, state, zip code " value={jobLocation} onChange={handleJobLocationInput}></input>
          </div> */}

          <div className="search-job-form-inputs">
            <label>State</label>
            <select required onChange={handleStateCategoryChange} value={jobState}>
              {countryCityState.getStatesByShort("US").map((state, index) => {
                return (
                  <option key={index} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="search-job-form-inputs">
            <label>City</label>
            <select onChange={handleCityChange} value={jobCity}>
              {countryCityState.getCities("US", jobState).map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="search-job-form-inputs">
            <label>Distance</label>
            <input required type="number" placeholder="distance in miles" value={distance} onChange={handleDistanceChange} />
          </div>

          <button className="search-job-form-button">Find Jobs</button>
        </form>
      </section>
    </>
  );
}

export default withRouter(SearchJob);

/*If you decide to use LinkedIn as the Job Search API
SearchJob Component - make a request to LinkedIn using JobSearch Api
JobListing component should display each of those results
  - If a job listing is clicked,  make a request to LinkedIn's job lookup api, making sure to include the ID of the job, and then render the JobDetails component with the data received from making a request to the JobLookupApi

https://developer.linkedin.com/docs/v1/jobs/job-search-api
https://developer.linkedin.com/docs/v1/jobs/job-lookup-api-and-fields
  */

/*
Old Github SearchString 
const searchJobString = `${process.env.REACT_APP_CORS_PROXY}https://jobs.github.com/positions.json?${process.env.REACT_APP_GH_CLIENT_KEY}&${process.env.REACT_APP_GH_CLIENT_SECRET}`;

Old Github API Get Request - 
const response = await axios.get(`${searchJobString}&description=${jobTitle}&location=${jobLocation}&full_time=true&markdown=true`);

Adzune API Request 
const searchJobString = `${process.env.REACT_APP_CORS_PROXY}http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_API_KEY}`;
https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id={YOUR_APP_ID}&app_key={YOUR_APP_KEY}
const response = await axios.get(`${searchJobString}&results_per_page=10&what=${jobTitle}&where=${jobLocation}&distance=${distance}content-type=application/json`, {

MUSE API REQUEST
const searchJobString = `${process.env.REACT_APP_CORS_PROXY}https://www.themuse.com/api/public/jobs?api_key=${process.env.REACT_APP_MUSE_API_KEY}`;
const response = await axios.get(`${searchJobString}&page=0&name=${jobTitle}&location=${jobLocation}`, {

*/
