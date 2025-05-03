const express = require("express");
const cors = require('cors');
const app = express();
const URLRoute = require('./routes/urlRoute')


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use('/api', URLRoute);


const port = 3005;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


module.exports = app;