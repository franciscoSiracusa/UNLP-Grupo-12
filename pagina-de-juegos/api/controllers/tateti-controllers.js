const tatetiGame = require('../games/tateti.js');

const initializeGame = (req, res) => {
  let currentBoard;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego
    currentBoard = tatetiGame.createGame();
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador
    currentBoard = tatetiGame.searchBoard(req.query.id);
  }

  res.send(currentBoard);
};

const updateGame = (req, res) => {
  let currentBoard = tatetiGame.updateGame(req.query.id, req.query.square);

  res.send(currentBoard);
};

const reset = (req, res) => {
  let currentBoard = tatetiGame.reset(req.query.id);

  res.send(currentBoard);
};

module.exports = {
  initializeGame,
  updateGame,
  reset,
};
