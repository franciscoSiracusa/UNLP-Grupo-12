const { v4: uuidv4 } = require('uuid');

let games = [];

const searchGame = (id) => {
  return games.find((obj) => obj.info.id === id);
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
      game.info.currentWord =
        game.info.currentWord.substr(0, index) +
        letter +
        game.info.currentWord.substr(index + 1);
      success = true;
    }
  });
  return success;
};

const createGame = () => {
  let currentGame = {
    // el turno del que da la palabra. 0 para el jugador 0, 1 para el jugador 1
    info: {
      writter: [0, 1][Math.floor(Math.random() * [0, 1].length)],
      id: uuidv4(),
      currentWord: null,
      attempts: 0,
      letters: '',
      status: 'playing',
    },
    word: null,
  };

  games.push(currentGame);

  return currentGame.info;
};

const setWord = (id, word) => {
  let currentGame = searchGame(id);

  currentGame.word = word.toLowerCase();

  currentGame.info.currentWord = setCurrentWord(currentGame.word);

  return currentGame.info;
};

const attempt = (id, letter) => {
  let currentGame = searchGame(id);

  if (
    !currentGame.info.letters.includes(letter.toLowerCase()) &&
    currentGame.info.status === 'playing'
  ) {
    currentGame.info.letters += letter.toLowerCase();

    if (!checkWord(currentGame, letter.toLowerCase())) {
      currentGame.info.attempts++;
      if (currentGame.info.attempts === 6) {
        currentGame.info.status = 'dead';
      }
    }
    if (currentGame.word === currentGame.info.currentWord) {
      currentGame.info.status = 'survived';
    }
  }

  return currentGame.info;
};

const reset = (id) => {
  let currentGame = searchGame(id);

  if (currentGame.info.status !== 'playing') {
    currentGame.info.writter = currentGame.info.writter === 0 ? 1 : 0;
    currentGame.word = null;
    currentGame.info.currentWord = null;
    currentGame.info.attempts = 0;
    currentGame.info.letters = '';
    currentGame.info.status = 'playing';
  }

  return currentGame.info;
};

module.exports = {
  searchGame,
  createGame,
  setWord,
  attempt,
  reset,
};
