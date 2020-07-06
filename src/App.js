import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SearchJob from "./components/Body/SearchJob/SearchJob";
import JobListings from "./components/Body/JobListings/JobListings";
import JobDetails from "./components/Body/JobListings/JobDetails/JobDetails";
import { useImmerReducer } from "use-immer";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";
import FlashMessages from "./components/Utils/FlashMessages/FlashMessages";

function App() {
  const [jobResults, setJobResults] = useState([]);
  const initialState = {
    jobResults: [],
    clickedJob: {},
    flashMessages: [],
  };

  const [state, dispatch] = useImmerReducer(appReducer, initialState);

  function handleJobResults(data) {
    setJobResults(data);
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className="app">
            <Header />
            <FlashMessages messages={state.flashMessages} />
            <Switch>
              <Route exact path="/">
                <SearchJob handleJobResults={handleJobResults} />
              </Route>
              <Route exact path="/job-listings">
                <JobListings jobResults={jobResults} />
              </Route>
              <Route exact path="/job-listings/:job_id">
                <JobDetails />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;

function appReducer(draftState, action) {
  switch (action.type) {
    case "JOB_LISTING_CLICK":
      draftState.clickedJob = { ...action.job };
      break;
    case "FLASH_MESSAGE":
      draftState.flashMessages.push(action.value);
      break;
    default:
      return draftState;
  }
}
