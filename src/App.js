import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SearchJob from "./components/Body/SearchJob/SearchJob";
import JobListings from "./components/Body/JobListings/JobListings";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/">
            <SearchJob />
          </Route>
          <Route path="/job-listings">
            <JobListings />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
