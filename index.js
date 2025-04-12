const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");
const moment = require("moment");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

// root router
const route = require("./routers/index");
const { db_connection } = require("./controller/db");
app.use("/api", route);

app.use(bodyParser.json({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from Mogo API!");
});

const PORT = process.env.PORT || 4000;

db_connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

console.log(moment("2024-05-08T11:38:48.376+00:00").format("LLLL"));
