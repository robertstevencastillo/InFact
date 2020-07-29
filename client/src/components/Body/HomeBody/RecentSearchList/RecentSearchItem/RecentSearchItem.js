import React from "react";
import "./RecentSearchItem.css";

function RecentSearchItem(props) {
  function handleRecentSearchItemClick() {
    props.handleRecentSearchItemClick({ jobTitle: props.jobTitle, jobLocation: props.jobLocation, distance: props.distance });
  }

  return (
    <div className="recent-search-item" onClick={handleRecentSearchItemClick}>
      <p className="recent-search-item-job-title">Keyword(s) - {props.jobTitle === "" ? "Any Job Title" : props.jobTitle}</p>
      <p className="recent-search-item-job-location">Location - {props.jobLocation === "" ? "Anywhere" : props.jobLocation}</p>
      <p className="recent-search-item-job-distance">Search Radius - {props.distance}mi</p>
    </div>
  );
}

export default RecentSearchItem;
