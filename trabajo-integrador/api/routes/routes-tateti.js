const { Router } = require('express');
const router = Router();
const tatetiControllers = require('../controllers/tateti-controllers');
const path = require('path');

router.get('/tateti', (req, res) => {
  res.sendFile('tateti.html', {
    root: path.join(__dirname, '../', '../', 'public'),
  });
});

router.patch('/tateti', tatetiControllers.updateGame);

router.get('/tateti/start', tatetiControllers.initializeGame);

router.patch('/tateti/reset', tatetiControllers.reset);

module.exports = router;
