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
    console.log(currentBoard.id);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador

    currentBoard = searchBoard(req.query.id.split('=')[1]); // es feo pero funciona
  }
  console.log(currentBoard)
  res.send(currentBoard);
};

const updateGame = (req, res) => {

  // console.log(req.query.id)
  // let currentBoard = searchBoard(req.query.id);

  console.log(req.query.square);

  gameData.board[req.query.square] = gameData.turn;
  gameData.turn = gameData.turn === 'X' ? 'O' : 'X';

  console.log(gameData);
}

module.exports = { 
  initializeGame,
  updateGame
};
