const { Router } = require('express');
const router = Router();
const ahorcadoControllers = require('../controllers/ahorcado-controllers.js');

router.get('/ahorcado', (req, res) => {
  res.sendFile('/public/ahorcado.html', { root: process.cwd() });
});

router.get('/ahorcado/start', ahorcadoControllers.initializeGame);

router.patch('/ahorcado/setWord', ahorcadoControllers.setWord);

router.patch('/ahorcado/attempt', ahorcadoControllers.attempt);

router.patch('/ahorcado/reset', ahorcadoControllers.reset);

module.exports = router;
