const { Router } = require('express');
const router = Router();

router.get('/pptls', (req, res) => {
	res.sendFile('/public/pptls.html', { root: process.cwd() });
})

module.exports = router;