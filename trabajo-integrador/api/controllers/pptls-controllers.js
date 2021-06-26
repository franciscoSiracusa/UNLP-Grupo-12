const { v4: uuidv4 } = require("uuid");

let games = [];

const arePlayersReady = (players) => {
  return players[0].ready && players[1].ready;
};

// retorna 0 si gana player0
//         1 si gana player1
//         -1 si hay empate
const checkResult = (players) => {
  const option0 = players[0].option;
  const option1 = players[1].option;
  if (option0 === option1) {
    return -1;
  } else {
  switch (option0) {
    case "rock":
      if (option1 === "lizard" || option1 === "scissors") { //caso que gana option0
        return 0;
      } else if ( option1 === "paper" || option1 === "spock") { //caso que pierde option0
        return 1;
      }
      break;
    case "paper":
      if (option1 === "rock" || option1 === "spock") {
        return 0;
      } else if ( option1 === "scissors" || option1 === "lizard") {
        return 1;
      }
      break;
    case "scissors":
      if (option1 === "paper" || option1 === "lizard") {
        return 0;
      } else if (option1 === "spock" || option1 === "rock") {
        return 1;
      }
      break;
    case "lizard":
      if (option1 === "spock" || option1 === "paper") {
        return 0;
      } else if (option1 === "rock" || option1 === "scissors") {
        return 1;
      }
      break;
    case "spock":
      if (option1 === "scissors" || option1 === "rock") {
        return 0;
      } else if (option1 === "paper" || option1 === "lizard") {
        return 1;
      }
      break;
  }
  }
};

const searchGame = (id) => {
  return games.find((obj) => obj.id === id);
};

const initializeGame = (req, res) => {
  let currentGame;

  if (req.query.id === "-1") {
    //si no existe, se crea un nuevo juego
    currentGame = {
      players: [
        {
          points: 0,
          ready: false,
          option: null,
          /* connected: false, */
        },
        {
          points: 0,
          ready: false,
          option: null,
          /* connected: false, */
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

/* const toggleConnect = (req, res) => {
  let currentGame = searchGame(req.query.id);

  if (currentGame.players[req.query.player].connected) {
    currentGame.players[req.query.player].connected = false;
  } else {
    currentGame.players[req.query.player].connected = true;
  }

  res.sendStatus(200);
}; */

module.exports = {
  initializeGame,
  updateGame,
  reset,
  /* toggleConnect, */
};
