import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import HomeBody from "./components/Body/HomeBody/HomeBody";
import JobListings from "./components/Body/JobListings/JobListings";
import JobDetails from "./components/Body/JobListings/JobDetails/JobDetails";
import { useImmerReducer } from "use-immer";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";
import FlashMessages from "./components/Utils/FlashMessages/FlashMessages";

function App() {
  const initialState = {
    jobResults: [],
    clickedJob: {},
    flashMessages: [],
    recentSearches: [],
    isLoading: false,
  };

  const [state, dispatch] = useImmerReducer(appReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className="app">
            <Header />
            <FlashMessages messages={state.flashMessages} />
            <Switch>
              <Route exact path="/">
                <HomeBody />
              </Route>
              <Route exact path="/job-listings">
                <JobListings />
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
    case "SAVE_JOB_RESULTS":
      draftState.jobResults = [...action.jobResults];
      break;
    case "JOB_LISTING_CLICK":
      draftState.clickedJob = { ...action.job };
      break;
    case "FLASH_MESSAGE":
      draftState.flashMessages.push(action.value);
      break;
    case "ADD_TO_RECENT_SEARCHES":
      draftState.recentSearches.push({ jobTitle: action.jobTitle, jobLocation: action.jobLocation });
      break;
    case "APP_IS_LOADING":
      draftState.isLoading = true;
      break;
    case "APP_NOT_LOADING":
      draftState.isLoading = false;
      break;
    default:
      return draftState;
  }
}
