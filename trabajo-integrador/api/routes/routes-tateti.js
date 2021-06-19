const { Router } = require('express');
const router = Router();
const tatetiControllers = require('../controllers/tateti-controllers');

router.get('/tateti', (req, res) => {
  res.sendFile('/public/tateti.html', { root: process.cwd() });
});

router.put('/tateti', tatetiControllers.updateGame);

router.get('/tateti/start', tatetiControllers.initializeGame);

module.exports = router;
