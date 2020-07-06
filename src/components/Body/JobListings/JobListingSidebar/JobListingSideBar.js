import React, { useState } from "react";
import "./JobListingSidebar.css";

function JobListingSideBar(props) {
  const [locationInput, setLocatonInput] = useState("");

  function handleLocationInput(event) {
    setLocatonInput(event.target.value);
  }

  return (
    <aside className="job-listings-sidebar-container">
      <label>Location</label>
      <input onChange={handleLocationInput} value={locationInput} />
    </aside>
  );
}

export default JobListingSideBar;
