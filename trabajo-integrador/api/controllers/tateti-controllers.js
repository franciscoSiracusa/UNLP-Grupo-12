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

const checkDraw = (board) => {
  let isDraw = true;
  board.forEach((element) => {
    if (element === null) {
      isDraw = false;
    }
  });
  return isDraw;
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
      draw: false,
    };

    games.push(currentBoard);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador
    currentBoard = searchBoard(req.query.id);
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
    } else if (checkDraw(currentBoard.board)) {
      currentBoard.draw = true;
    } else {
      currentBoard.turn = currentBoard.turn === 'X' ? 'O' : 'X';
    }
  }
  //borrar board luego de haber terminado el partido, debe pasar un tiempo (hacer un pop)
  res.send(currentBoard);
};

module.exports = {
  initializeGame,
  updateGame,
};

// para el metodo borrar hay dos condiciones, que haya ganado o que empaten, comprobar que winner=false y el arreglo esta lleno ---> hacer una funtion que busque el juego por id y lo borre en los casos

// en el momento de borrar el tablero al finalizar, hay que esperar mas de 3 seg
