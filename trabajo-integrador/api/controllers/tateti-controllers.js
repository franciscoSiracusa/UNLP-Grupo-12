let games = [];

const initializeGame = (req, res) => {
  console.log(req.query.id);
  let currentBoard;
  if (req.query.id === -1) {
    //si no existe, se crea un nuevo juego
    currentBoard = {
      id: Math.floor(Math.random() * 1000),
      board: [null, null, null, null, null, null, null, null, null],
      turn: 'X',
    };
    games.push(currentBoard);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador
  }

  res.send(currentBoard);
};

module.exports = { initializeGame };
