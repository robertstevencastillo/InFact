const axios = require("axios");
const dotenv = require("dotenv");

const adzuna_base_url = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${dotenv.config().parsed.ADZUNA_APP_ID}&app_key=${dotenv.config().parsed.ADZUNA_API_KEY}`;

module.exports = {
  getAdzunaJobs: (jobTitle, jobLocation, distance, pageNumber, resultsPerPage) =>
    axios({
      method: "GET",
      url: adzuna_base_url,
      headers: {
        "content-type": "application/json",
      },
      params: {
        what: jobTitle,
        where: jobLocation,
        distance,
        page: pageNumber,
        results_per_page: resultsPerPage,
      },
    }),
};
// Make an API request in this file
//Get the results and pass them along to server.js
// somehow figure out how to get those results from server.js to our frontend
