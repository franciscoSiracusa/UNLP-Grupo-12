const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static('public'));

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

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
})

// RUTAS PRINCIPALES

// home

app.get('/', (req, res) => {
	res.sendFile('/public/index.html', { root: __dirname });
})

// juegos

app.get('/tateti', (req, res) => {
	res.sendFile('/public/tateti.html', { root: __dirname });
})

app.get('/pptls', (req, res) => {
	res.sendFile('/public/pptls.html', { root: __dirname });
})

app.get('/ahorcado', (req, res) => {
	res.sendFile('/public/ahorcado.html', { root: __dirname });
})

// TATETI

app.put('/tateti', (req, res) => {
	console.log(gameData);

	gameData.board[req.query.square] = gameData.turn;
	gameData.turn = gameData.turn === "X" ? "O" : "X";

	console.log(gameData);
})

app.get('/tateti/start', (req, res) => {
	res.send(gameData)
})


