import React, { useContext } from "react";
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
  const searchJobString = `${process.env.REACT_APP_CORS_PROXY}http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_API_KEY}`;

  async function handleRecentSearchItemClick(searchQueryObj) {
    appDispatch({ type: "APP_IS_LOADING", value: true });
    const response = await axios.get(`${searchJobString}&results_per_page=5&what=${searchQueryObj.jobTitle}&where=${searchQueryObj.jobLocation}&content-type=application/json`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "access-control-allow-origin",
      },
    });
    appDispatch({ type: "APP_NOT_LOADING", value: false });
    console.log(response);
    appDispatch({ type: "SAVE_JOB_RESULTS", jobResults: response.data.results });
    props.history.push("/job-listings");
  }

  if (appState.isLoading)
    return (
      <div className="loading-dots-container">
        <LoadingDotsIcon />
      </div>
    );

  return (
    <>
      {appState.recentSearches.length === 0 ? (
        <div></div>
      ) : (
        <section className="recent-searches-container">
          <div className="recent-searches-section-container">
            <h3>Recent Searches</h3>
            <div className="recent-searches-list">
              {appState.recentSearches.map((search, index) => {
                return <RecentSearchItem key={index} jobTitle={search.jobTitle} jobLocation={search.jobLocation} handleRecentSearchItemClick={handleRecentSearchItemClick} />;
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
