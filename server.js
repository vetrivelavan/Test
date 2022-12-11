const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const routes = require("./routes/approute")
const DB = process.env.DB

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,      //mongo connection
}).then(() => {
    console.log("DB is connected!")
})

app.use("/", routes);  // main route

app.use("*", function (req, res) { 
  res.status(200).json({"error":"not found!"});  // validation fo invalid routes
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
