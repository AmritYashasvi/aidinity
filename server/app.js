const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimitMiddleware = require("./middleware/ratelimit");
const PORT = process.env.PORT || 3005;
const dbConnection = require("./database/connect");

const path = require("path");
const exp = require("constants");

const _dirname = path.dirname("");
const buildpath = path.join(__dirname, "../client/dist");



const app = express();
app.use(express.static(buildpath));
app.use("*", cors( { credentials: true, origin:true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(rateLimitMiddleware);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnection();

app.use("/", require("./router/router"));

app.listen(PORT, () => {
  console.log(`App active on port ${PORT}!`);
});
