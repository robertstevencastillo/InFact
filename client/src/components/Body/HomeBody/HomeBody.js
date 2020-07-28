import React from "react";
import SearchJob from "./SearchJob/SearchJob";
import RecentSearchList from "./RecentSearchList/RecentSearchList";

function HomeBody(props) {
  return (
    <>
      <SearchJob />
      <RecentSearchList />
    </>
  );
}

export default HomeBody;
