import React, { useContext } from "react";
import SearchJob from "./SearchJob/SearchJob";
import RecentSearchList from "./RecentSearchList/RecentSearchList";
import StateContext from "../../../context/StateContext";
import LoadingDotsIcon from "../../Utils/LoadingDots/LoadingDotsIcon";

function HomeBody(props) {
  const appState = useContext(StateContext);

  return (
    <>
      {appState.isLoading ? (
        <div className="loading-dots-container">
          <LoadingDotsIcon />
        </div>
      ) : (
        <>
          <SearchJob />
          <RecentSearchList />
        </>
      )}
    </>
  );
}

export default HomeBody;

/*The conditional rendering we have in our return function is causing this error:
index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    in SearchJob (created by Context.Consumer)
    in withRouter(SearchJob) (at HomeBody.js:18)
*/
