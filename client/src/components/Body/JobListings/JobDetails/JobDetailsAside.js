import React from "react";
import { withRouter } from "react-router-dom";
import "./JobDetailsAside.css";
//import ReactMarkdown from "react-markdown";

function JobDetailsAside(props) {
  function handleReturnToSearchClick(event) {
    props.history.push("/job-listings");
  }

  return (
    <aside className="job-details-sidebar-container">
      <div className="job-details-aside-back-search-container">
        <span>
          <img alt="search back arrow " className="job-details-sidebar-arrow" src="https://cdn1.iconfinder.com/data/icons/menu-3-3/32/back_left_arrow_point-512.png" />{" "}
        </span>
        <span onClick={handleReturnToSearchClick}>Back To Search</span>
      </div>
      {/* <ReactMarkdown source={props.howToApplyToJob} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} /> */}
    </aside>
  );
}

export default withRouter(JobDetailsAside);
