const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const HTTP_PORT = process.env.PORT || 8080;

require("dotenv").config();
const connectionString = process.env.MONGODB_CONN_STRING;

app.listen(HTTP_PORT, () => {
   console.log(`listening on port ${HTTP_PORT}`);
   console.log(`mongodb connection string: ${connectionString}`);
});
