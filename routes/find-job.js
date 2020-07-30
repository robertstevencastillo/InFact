const express = require("express");
const router = express.Router();
const axios = require("axios");
const puppeteer = require("puppeteer");

router.get("/", async (request, response) => {
  try {
    let jobData = await getJobDescription(request.query.url);
    response.json({
      url: request.query.url,
      jobTitle: request.query.jobTitle,
      companyName: request.query.companyName,
      postedDate: request.query.postedDate,
      jobLocation: request.query.jobLocation,
      jobData,
    });
  } catch (error) {
    console.log(error);
    response.json({
      error,
    });
  }
});

const getJobDescription = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(() => {
      // let jobBody = document.querySelector(".jobsearch-jobDescriptionText").innerHTML;
      let jobBody = document.querySelector(".jobsearch-JobComponent-description").innerHTML;
      return {
        jobBody,
      };
    });
    browser.close();
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;
