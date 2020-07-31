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
      <div className="job-details-aside-back-search-container" onClick={handleReturnToSearchClick}>
        <span className="job-details-sidebar-arrow">&#8592;</span>
        <span className="job-details-sidebar-text">Back To Search</span>
      </div>
      {/* <ReactMarkdown source={props.howToApplyToJob} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} /> */}
    </aside>
  );
}

export default withRouter(JobDetailsAside);
