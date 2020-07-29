const express = require("express");
const router = express.Router();
const IndeedService = require("scrape-indeed")();

router.get("/", (request, response) => {
  console.log(request.query);
  let options = {
    title: request.query.title,
    location: request.query.location,
    country: request.query.country,
    radius: request.query.radius,
    count: request.query.count,
  };

  IndeedService.query(options)
    .then(data => {
      response.json(data.jobList);
    })
    .catch(error => {
      response.json(error);
    });
});

module.exports = router;
