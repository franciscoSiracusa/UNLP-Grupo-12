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

const createGame = () => {
  let currentGame = {
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

    return currentGame;
}

const setWord = (id, word) => {
  let currentGame = searchGame(id);

  currentGame.word = word.toLowerCase();

  currentGame.currentWord = setCurrentWord(currentGame.word);

  return currentGame;
}

const attempt = (id, letter) => {
  let currentGame = searchGame(id);

  if (
    !currentGame.letters.includes(letter.toLowerCase()) &&
    currentGame.status === 'playing'
  ) {
    currentGame.letters += letter.toLowerCase();

    if (!checkWord(currentGame, letter.toLowerCase())) {
      currentGame.attempts++;
      if (currentGame.attempts === 6) {
        currentGame.status = 'dead';
      }
    }
    if (currentGame.word === currentGame.currentWord) {
      currentGame.status = 'survived';
    }
  }

  return currentGame;
};

const reset = (id) => {
  let currentGame = searchGame(id);

  if (currentGame.status !== 'playing') {
    currentGame.writter = currentGame.writter === 0 ? 1 : 0;
    currentGame.word = null;
    currentGame.currentWord = null;
    currentGame.attempts = 0;
    currentGame.letters = '';
    currentGame.status = 'playing';
  }

  return currentGame;
};

module.exports = {
  searchGame,
  createGame,
  setWord,
  attempt,
  reset
}