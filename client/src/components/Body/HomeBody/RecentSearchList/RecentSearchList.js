import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import DispatchContext from "../../../../context/DispatchContext";
import StateContext from "../../../../context/StateContext";
import RecentSearchItem from "./RecentSearchItem/RecentSearchItem";
import LoadingDotsIcon from "../../../Utils/LoadingDots/LoadingDotsIcon";
import axios from "axios";
import "./RecentSearchList.css";

function RecentSearchList(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [loading, setLoading] = useState(false);

  async function handleRecentSearchItemClick(searchQueryObj) {
    setLoading(true);
    const response = await axios.get("/find-jobs", {
      params: {
        title: searchQueryObj.jobTitle,
        location: searchQueryObj.jobLocation,
        country: "North America",
        radius: ConvertMilesToKilometersDistance(searchQueryObj.distance),
        count: 50,
      },
    });
    const results = [...response.data];
    setLoading(false);
    appDispatch({ type: "SAVE_JOB_RESULTS", jobResults: results });
    appDispatch({ type: "ACTIVE_JOB_LISTINGS_PAGE", activePage: 1 });
    props.history.push("/job-listings");
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
      ) : appState.recentSearches.length === 0 ? (
        <div></div>
      ) : (
        <section className="recent-searches-container">
          <div className="recent-searches-section-container">
            <h3>Recent Searches</h3>
            <div className="recent-searches-list">
              {appState.recentSearches.map((search, index) => {
                return <RecentSearchItem key={index} jobTitle={search.jobTitle} jobLocation={search.jobLocation} handleRecentSearchItemClick={handleRecentSearchItemClick} distance={search.distance} />;
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default withRouter(RecentSearchList);

//     const response = await axios.get(`${searchJobString}&description=${searchQueryObj.jobTitle}&location=${searchQueryObj.jobLocation}&full_time=true&markdown=true`);
