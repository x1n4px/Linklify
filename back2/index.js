const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto de Vercel (si existe) o el 3000 en local


// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/url', require('./api/url'));

// Ruta de prueba raíz
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Node.js en Vercel</title></head>
      <body>
       <h1>Servidor corriendo en el puerto ${PORT}</h1>
        <p>Prueba el endpoint de salud: <a href="/api/url/health">/api/url/health</a></p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
    console.log(`\n✨ Servidor corriendo en: http://localhost:${PORT}`); // Mensaje claro en consola
  });

// Export para Vercel
module.exports = app;