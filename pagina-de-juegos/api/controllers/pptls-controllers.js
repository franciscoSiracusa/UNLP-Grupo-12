const pptlsGame = require('../games/pptls.js');

const initializeGame = (req, res) => {
  let currentGame;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego
    currentGame = pptlsGame.createGame();
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador
    currentGame = pptlsGame.searchGame(req.query.id);
  }

  res.send(currentGame);
};

const updateGame = (req, res) => {
  let currentGame = pptlsGame.updateGame(req.query.id, req.query.player, req.query.option);

  res.send(currentGame);
};

const reset = (req, res) => {
  pptlsGame.reset(req.query.id, req.query.player);

  res.sendStatus(200);
};

module.exports = {
  initializeGame,
  updateGame,
  reset,
};
