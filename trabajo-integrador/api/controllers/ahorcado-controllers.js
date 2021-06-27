const { v4: uuidv4 } = require('uuid');

let games = [];

const searchGame = (id) => {
  return games.find((obj) => obj.id === id);
};

const setCurrentWord = ([...word]) => {
  let currentWord = '';
  word.forEach((letter) => {
    if (letter === ' ') {
      currentWord += ' ';
    } else {
      currentWord += '_';
    }
  });
  return currentWord;
};

const checkWord = (game, letter) => {
  let wordArray = [...game.word];
  let success = false;
  wordArray.forEach((wordletter, index) => {
    if (letter === wordletter) {
      game.currentWord =
        game.currentWord.substr(0, index) +
        letter +
        game.currentWord.substr(index + 1);
      success = true;
    }
  });
  return success;
};

const initializeGame = (req, res) => {
  let currentGame;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego
    currentGame = {
      // el turno del que da la palabra. 0 para el jugador 0, 1 para el jugador 1
      writter: [0, 1][Math.floor(Math.random() * [0, 1].length)],
      //quizas deberia haber unos puntos
      id: uuidv4(),
      word: null,
      currentWord: null,
      attempts: 0,
      letters: '',
      status: 'playing',
    };
    games.push(currentGame);
  } else {
    currentGame = searchGame(req.query.id);
  }
  res.send(currentGame);
};

const setWord = (req, res) => {
  let currentGame = searchGame(req.query.id);

  currentGame.word = req.query.word.toLowerCase();

  currentGame.currentWord = setCurrentWord(currentGame.word);

  res.send(currentGame);
};

const attempt = (req, res) => {
  let currentGame = searchGame(req.query.id);

  if (
    !currentGame.letters.includes(req.query.letter.toLowerCase()) &&
    currentGame.status === 'playing'
  ) {
    currentGame.letters += req.query.letter.toLowerCase();

    if (!checkWord(currentGame, req.query.letter.toLowerCase())) {
      currentGame.attempts++;
      if (currentGame.attempts === 6) {
        currentGame.status = 'dead';
      }
    }
    if (currentGame.word === currentGame.currentWord) {
      currentGame.status = 'survived';
    }
  }
  res.send(currentGame);
};

const reset = (req, res) => {
  let currentGame = searchGame(req.query.id);

  if (currentGame.status !== 'playing') {
    currentGame.writter = currentGame.writter === 0 ? 1 : 0;
    currentGame.word = null;
    currentGame.currentWord = null;
    currentGame.attempts = 0;
    currentGame.letters = '';
    currentGame.status = 'playing';
  }

  res.send(currentGame);
};

module.exports = {
  initializeGame,
  setWord,
  attempt,
  reset,
};

// salamin con queso
// _a_a___ ___ _____
// a
