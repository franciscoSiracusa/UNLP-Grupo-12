let games = [];

const initializeGame = (req, res) => {
  let currentBoard;
  if (req.query.id === -1) {
    //si no existe, se crea un nuevo juego
    currentBoard = {
      id: Math.floor(Math.random() * 1000), //uuid
      board: [null, null, null, null, null, null, null, null, null],
      turn: 'X', // posiblemente debe hacer una id para cada jugador
    };
    games.push(currentBoard);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador
    currentBoard = games.find((obj) => obj.id === req.query.id);
  }

  res.send(currentBoard);
};

module.exports = { initializeGame };
