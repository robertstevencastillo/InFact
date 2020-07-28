import React from "react";
import "./RecentSearchItem.css";

function RecentSearchItem(props) {
  function handleRecentSearchItemClick() {
    props.handleRecentSearchItemClick({ jobTitle: props.jobTitle, jobLocation: props.jobLocation });
  }

  return (
    <div className="recent-search-item" onClick={handleRecentSearchItemClick}>
      <p className="recent-search-item-job-title">{props.jobTitle === "" ? "Any Job Title" : props.jobTitle}</p>
      <p className="recent-search-item-job-location">{props.jobLocation === "" ? "Anywhere" : props.jobLocation}</p>
    </div>
  );
}

export default RecentSearchItem;
