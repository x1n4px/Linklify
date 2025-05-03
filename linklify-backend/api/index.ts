const express = require("express");
const cors = require('cors');
const app = express();
const URLRoute = require('./routes/urlRoute');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.use('/api', URLRoute);

// Remove the app.listen() block
// const port = 3005;
// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });

module.exports = app; // Export the app for Vercel