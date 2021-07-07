const ahorcadoGame = require('../games/ahorcado.js');

const initializeGame = (req, res) => {
  let currentGame;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego
    currentGame = ahorcadoGame.createGame();
  } else {
    currentGame = ahorcadoGame.searchGame(req.query.id);
  }

  res.send(currentGame);
};

const setWord = (req, res) => {
  let currentGame = ahorcadoGame.setWord(req.query.id, req.query.word);

  res.send(currentGame);
};

const attempt = (req, res) => {
  let currentGame = ahorcadoGame.attempt(req.query.id, req.query.letter);

  res.send(currentGame);
};

const reset = (req, res) => {
  let currentGame = ahorcadoGame.reset(req.query.id);

  res.send(currentGame);
};

module.exports = {
  initializeGame,
  setWord,
  attempt,
  reset,
};
