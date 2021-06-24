const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// RUTAS PRINCIPALES

// home

app.get('/', (req, res) => {
  res.sendFile('/public/index.html', { root: __dirname });
});

// juegos

app.use(require('./api/routes/routes-tateti.js'));

app.use(require('./api/routes/routes-pptls.js'));

app.use(require('./api/routes/routes-ahorcado.js'));

// 404
app.use((req, res) => {
  res.status(404).sendFile('./public/404.html', { root: __dirname });
})
