const { Router } = require('express');
const router  = Router();

let gameData = {
	id: Math.floor(Math.random() * 1000),
	board: [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null
	],
	turn: "X"
}

router.get('/tateti', (req, res) => {
	res.sendFile('public/tateti.html', { root: process.cwd() });
})

router.put('/tateti', (req, res) => {
	console.log(gameData);

	gameData.board[req.query.square] = gameData.turn;
	gameData.turn = gameData.turn === "X" ? "O" : "X";

	console.log(gameData);
})

router.get('/tateti/start', (req, res) => {
	res.send(gameData)
})

module.exports = router;