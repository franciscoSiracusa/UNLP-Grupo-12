const { v4: uuidv4 } = require('uuid');

let games = [];

const arePlayersReady = (players) => {
  return players[0].ready && players[1].ready;
};

// retorna 0 si gana player0
//         1 si gana player1
//         -1 si hay empate
const checkResult = (players) => {
  const option1 = players[0].option;
  const option2 = players[1].option;
  return 1;
  // if (todas las opciones)
  // return
};

const checkDraw = () => {};

const searchGame = (id) => {
  return games.find((obj) => obj.id === id);
};

const initializeGame = (req, res) => {
  let currentGame;

  if (req.query.id === '-1') {
    //si no existe, se crea un nuevo juego
    currentGame = {
      players: [
        {
          points: 0,
          ready: false,
          option: null,
        },
        {
          points: 0,
          ready: false,
          option: null,
        },
      ],
      id: uuidv4(),
      result: null,
    };
    games.push(currentGame);
  } else {
    // caso contrario, busca el id correspondiente para el segundo jugador
    currentGame = searchGame(req.query.id);
  }
  res.send(currentGame);
};

const updateGame = (req, res) => {
  let currentGame = searchGame(req.query.id);

  currentGame.players[req.query.player].option = req.query.option;
  currentGame.players[req.query.player].ready = true;

  if (arePlayersReady(currentGame.players)) {
    currentGame.result = checkResult(currentGame.players);
    if (currentGame.result !== -1) {
      currentGame.players[currentGame.result].points++;
    }
  }

  res.send(currentGame);

  // puede ser que borremos el juego del array en el evento beforeunload
  // hay que hacer un resetGame cuando se hace rematch
};

const reset = (req, res) => {
  let currentGame = searchGame(req.query.id);

  currentGame.players[req.query.player].ready = false;
  currentGame.players[req.query.player].option = null;
  if (!currentGame.players[0].ready && !currentGame.players[1].ready) {
    //si ambos ya apretaron el boton de rematch
    currentGame.result = null;
  }
  res.sendStatus(200);
};

module.exports = {
  initializeGame,
  updateGame,
  reset,
};
