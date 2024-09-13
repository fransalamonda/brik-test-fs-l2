if (process.env.NODE_ENV !== "development") {
    require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const db = require("./models");
const app = express();

const port = process.env.PORT || 3000;

const index = require("./routes/index");
const errorHandler = require("./midleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// for route
app.use("/", index);

// for error handling
app.use(errorHandler);

app.listen(port, function () {
    console.log(`This app running on port ${port}`);
});
