import React, { useState, useContext } from "react";
import "./SearchJob.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import LoadingDotsIcon from "../../../Utils/LoadingDots/LoadingDotsIcon";
import DispatchContext from "../../../../context/DispatchContext";
const countryCityState = require("countrycitystatejson");

function SearchJob(props) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobState, setJobState] = useState("Pennsylvania");
  const [jobCity, setJobCity] = useState("Allentown");
  const [distance, setDistance] = useState(10);
  const appDispatch = useContext(DispatchContext);
  const [loading, setLoading] = useState(false);

  function handleJobTitleInput(event) {
    setJobTitle(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const jobLocation = jobCity === "" ? jobState : `${jobCity}, ${jobState}`;
    setLoading(true);
    try {
      const response = await axios.get("/find-jobs", {
        params: {
          title: jobTitle,
          location: jobLocation,
          country: "North America",
          radius: ConvertMilesToKilometersDistance(distance),
          count: 50,
        },
      });
      const results = [...response.data];
      setLoading(false);

      if (results.length === 0) {
        console.log("no results");
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "No Results Found",
        });
        setJobTitle("");
      } else {
        appDispatch({ type: "ADD_TO_RECENT_SEARCHES", jobTitle, jobLocation, distance });
        appDispatch({ type: "SAVE_JOB_RESULTS", jobResults: results });
        appDispatch({ type: "ACTIVE_JOB_LISTINGS_PAGE", activePage: 1 });
        setJobTitle("");
        props.history.push("/job-listings");
      }
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
    setDistance(event.target.value);
  }

  function ConvertMilesToKilometersDistance(distance) {
    var kilometers = Math.round(Number(distance * 1.6));
    return kilometers;
  }

  return (
    <>
      {loading ? (
        <div className="loading-dots-container">
          <LoadingDotsIcon />
        </div>
      ) : (
        <section className="search-job-container">
          <form className="search-job-form" onSubmit={handleFormSubmit}>
            <div className="search-job-form-inputs search-job-form-inputs-job">
              <label>What</label>
              <input required placeholder="Job title, keywords" value={jobTitle} onChange={handleJobTitleInput}></input>
            </div>

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
              <label>Distance (miles)</label>
              <input required type="number" value={distance} onChange={handleDistanceChange} />
            </div>

            <button className="search-job-form-button">Find Jobs</button>
          </form>
        </section>
      )}
    </>
  );
}

export default withRouter(SearchJob);
