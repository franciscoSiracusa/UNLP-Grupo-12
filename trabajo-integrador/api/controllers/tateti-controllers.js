let games = [];

const searchBoard = (id) => {
  return games.find((obj) => obj.id === id);
};

const isValidMove = (board, pos) => {
  return board[pos] === null;
};

const checkWinner = (board, turn) => {
  let isWinner = false;
  for (let i = 0; i < 3; i++) {
    if (turn === board[i] && turn === board[i + 3] && turn === board[i + 6]) {
      isWinner = true;
      break;
    }
    if (
      turn === board[3 * i] &&
      turn === board[3 * i + 1] &&
      turn === board[3 * i + 2]
    ) {
      isWinner = true;
      break;
    }
  }
  if (
    (turn === board[0] && turn === board[4] && turn === board[8]) ||
    (turn === board[2] && turn === board[4] && turn === board[6])
  ) {
    isWinner = true;
  }
  return isWinner;
};

const initializeGame = (req, res) => {
  let currentBoard;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego

    currentBoard = {
      id: Math.floor(Math.random() * 1000).toString(), //uuid
      board: [null, null, null, null, null, null, null, null, null],
      turn: 'X', // posiblemente debe hacer una id para cada jugador
      //posible atributo: invalidMove : true/false
      winner: null,
    };

    games.push(currentBoard);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador

    currentBoard = searchBoard(req.query.id.split('=')[1]); // es feo pero funciona
  }
  res.send(currentBoard);
};

const updateGame = (req, res) => {
  let currentBoard = searchBoard(req.query.id);

  // validar jugada
  if (isValidMove(currentBoard.board, req.query.square, currentBoard.winner)) {
    //salta un error del board
    currentBoard.board[req.query.square] = currentBoard.turn;
    if (checkWinner(currentBoard.board, currentBoard.turn)) {
      currentBoard.winner = currentBoard.turn;
      //borrar board luego de haber terminado (hacer un pop)
    }
    currentBoard.turn = currentBoard.turn === 'X' ? 'O' : 'X';
  }
  console.log(games);
};

module.exports = {
  initializeGame,
  updateGame,
};

//fix maximo 5 jugadas?
