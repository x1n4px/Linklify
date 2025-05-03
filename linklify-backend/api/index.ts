const express = require("express");
const cors = require('cors');
const app = express();
const URLRoute = require('./routes/urlRoute')
const serverless = require("serverless-http");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use('/api', URLRoute);


module.exports.handler = serverless(app);