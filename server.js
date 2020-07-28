const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const axios = require("axios");
const AdzunaApi = require("./api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API calls
app.get("/", () => {
  const adzunaAsyncApiCall = async () => {
    const response = await AdzunaApi.getAdzunaJobs("developer", "Philadelphia", 5, 1, 10);
    console.log(response.data);
  };

  adzunaAsyncApiCall();
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
