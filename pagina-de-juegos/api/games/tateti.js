const { v4: uuidv4 } = require('uuid');

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

const createGame = () => {
  let currentBoard = {
    id: uuidv4(),
    board: [null, null, null, null, null, null, null, null, null],
    firstTurn: ['X', 'O'][Math.floor(Math.random() * ['X', 'O'].length)],
    winner: null,
    draw: false,
    /*  players: [
      {
        points: 0,
        ready: false,
        round: 1,
      },
      {
        points: 0,
        ready: false,
        round: 1,
      },
    ], */
  };

  currentBoard.turn = currentBoard.firstTurn;
  games.push(currentBoard);

  return currentBoard;
};

const updateGame = (id, square) => {
  let currentBoard = searchBoard(id);

  if (isValidMove(currentBoard.board, square, currentBoard.winner)) {
    //salta un error del board
    currentBoard.board[square] = currentBoard.turn;
    if (checkWinner(currentBoard.board, currentBoard.turn)) {
      currentBoard.winner = currentBoard.turn;
    } else if (checkDraw(currentBoard.board)) {
      currentBoard.draw = true;
    } else {
      currentBoard.turn = currentBoard.turn === 'X' ? 'O' : 'X';
    }
  }

  return currentBoard;
};

const reset = (id) => {
  const currentBoard = searchBoard(id);

  if (currentBoard.winner || currentBoard.draw) {
    currentBoard.board = [null, null, null, null, null, null, null, null, null];
    currentBoard.winner = null;
    currentBoard.draw = false;
    currentBoard.firstTurn = currentBoard.firstTurn === 'X' ? 'O' : 'X';
    currentBoard.turn = currentBoard.firstTurn;
  }

  return currentBoard;
};

module.exports = {
  searchBoard,
  createGame,
  updateGame,
  reset,
};
