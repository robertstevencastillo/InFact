const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const findJobsRoute = require("./routes/find-jobs");
const findJobRoute = require("./routes/find-job");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//HTTP request logger
app.use(morgan("tiny"));

//Routes
app.use("/find-jobs", findJobsRoute);
app.use("/find-job", findJobRoute);

//Deployment
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Listen
app.listen(port, () => console.log(`Listening on port ${port}`));
