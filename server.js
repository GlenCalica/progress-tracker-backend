const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/users");

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
         app.use("/api", routes);
      });
   })
   .catch((err) => {
      console.log(err);
   });
