const { Router } = require('express');
const router = Router();
const path = require("path")
const pptlsControllers = require('../controllers/pptls-controllers.js');

router.get('/pptls', (req, res) => {
	res.sendFile('/pptls.html', { root: path.join(__dirname,'../','../','public') });
});

outer.get('/pptls/start', pptlsControllers.initializeGame);

module.exports = router;