const { v4: uuidv4 } = require('uuid');

let games = [];

const searchGame = (id) => {
  return games.find((obj) => obj.id === id);
};

const initializeGame = (req, res) => {
  let currentGame;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego
    currentGame = {
      players: [
	      {
	      	points: 0,
	      	ready: false
	      },
	      {
	      	points: 0,
	      	ready: false
	      }
      ],
      id: uuidv4(),
      winner: null,
      draw: false,
    };
    games.push(currentGame);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador
    currentGame = searchGame(req.query.id);
  }
  res.send(currentGame);
};


module.exports = {
  initializeGame,
  updateGame,
};