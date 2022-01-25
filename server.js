const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const usersRouter = require("./routes/users");
const metricsRouter = require("./routes/metrics");
const entriesRouter = require("./routes/entries");

const app = express();

app.use(express.json());
app.use(cors());

const HTTP_PORT = process.env.PORT || 8080;
const connectionString = process.env.MONGODB_CONN_STRING;

mongoose
   .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(HTTP_PORT, () => {
         console.log(`server listening on port ${HTTP_PORT}`);
         app.use("/api", usersRouter);
         app.use("/api", metricsRouter);
         app.use("/api", entriesRouter);
      });
   })
   .catch((err) => {
      console.log(err);
   });
