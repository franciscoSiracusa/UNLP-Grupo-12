let games = [];

const searchBoard = id => {
  return games.find(obj => obj.id === id);
}

const initializeGame = (req, res) => {
  let currentBoard;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego

    currentBoard = {
      id: Math.floor(Math.random() * 1000).toString(), //uuid
      board: [null, null, null, null, null, null, null, null, null],
      turn: 'X', // posiblemente debe hacer una id para cada jugador
    };

    games.push(currentBoard);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador

    currentBoard = searchBoard(req.query.id.split('=')[1]); // es feo pero funciona
  }
  res.send(currentBoard);
};

const updateGame = (req, res) => {

  console.log(req.query.id)
  let currentBoard = searchBoard(req.query.id);

  currentBoard.board[req.query.square] = currentBoard.turn;
  currentBoard.turn = currentBoard.turn === 'X' ? 'O' : 'X';

  console.log(currentBoard)
}

module.exports = { 
  initializeGame,
  updateGame
};
