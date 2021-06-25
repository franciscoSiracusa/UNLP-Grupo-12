const { Router } = require('express');
const router = Router();
const ahorcadoControllers = require('../controllers/ahorcado-controllers.js');

router.get('/ahorcado', (req, res) => {
  res.sendFile('/public/ahorcado.html', { root: process.cwd() });
});

router.get('/ahorcado/start', ahorcadoControllers.initializeGame);

router.post('/ahorcado/setWord', ahorcadoControllers.setWord);

module.exports = router;
