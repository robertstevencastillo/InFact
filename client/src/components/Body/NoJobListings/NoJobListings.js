import React from "react";
import SearchJob from "../SearchJob/SearchJob";
import "./NoJobListings.css";

function NoJobListings(props) {
  return (
    <div className="no-job-listings-container">
      <h4>No results for search. Please search again.</h4>
      <SearchJob />
    </div>
  );
}

export default NoJobListings;
