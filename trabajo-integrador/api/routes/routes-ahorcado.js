const { Router } = require('express');
const router = Router();

router.get('/ahorcado', (req, res) => {
	res.sendFile('/public/ahorcado.html', { root: process.cwd() });
})

module.exports = router;