const { Router } = require('express');
const router = Router();
const path = require('path');
const pptlsControllers = require('../controllers/pptls-controllers.js');

router.get('/pptls', (req, res) => {
  res.sendFile('/pptls.html', {
    root: path.join(__dirname, '../', '../', 'public'),
  });
});

router.get('/pptls/start', pptlsControllers.initializeGame);

router.patch('/pptls', pptlsControllers.updateGame);

router.post('/pptls/reset', pptlsControllers.reset);

router.post('/pptls/toggleConnect', pptlsControllers.toggleConnect);

module.exports = router;
