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

const checkWord = (word, currentWord) => {
  word.forEach((letter) => {});
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
      word: null, //salchicha y pan
      currentWord: null,
      letter: null,
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

  console.log(currentGame);
  res.sendStatus(200);
};

module.exports = {
  initializeGame,
  setWord,
};
