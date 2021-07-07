const { v4: uuidv4 } = require('uuid');

let games = [];

const arePlayersReady = (players) => {
  return (
    players[0].ready &&
    players[1].ready &&
    players[0].round === players[1].round
  );
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
      case 'rock':
        if (option1 === 'lizard' || option1 === 'scissors') {
          //caso que gana option0
          return 0;
        } else if (option1 === 'paper' || option1 === 'spock') {
          //caso que pierde option0
          return 1;
        }
        break;
      case 'paper':
        if (option1 === 'rock' || option1 === 'spock') {
          return 0;
        } else if (option1 === 'scissors' || option1 === 'lizard') {
          return 1;
        }
        break;
      case 'scissors':
        if (option1 === 'paper' || option1 === 'lizard') {
          return 0;
        } else if (option1 === 'spock' || option1 === 'rock') {
          return 1;
        }
        break;
      case 'lizard':
        if (option1 === 'spock' || option1 === 'paper') {
          return 0;
        } else if (option1 === 'rock' || option1 === 'scissors') {
          return 1;
        }
        break;
      case 'spock':
        if (option1 === 'scissors' || option1 === 'rock') {
          return 0;
        } else if (option1 === 'paper' || option1 === 'lizard') {
          return 1;
        }
        break;
    }
  }
};

const searchGame = (id) => {
  return games.find((obj) => obj.id === id);
};

const createGame = () => {
	let currentGame = {
      players: [
        {
          points: 0,
          ready: false,
          option: null,
          round: 1,
          /* connected: false, */
        },
        {
          points: 0,
          ready: false,
          option: null,
          round: 1,
          /* connected: false, */
        },
      ],
      id: uuidv4(),
      result: null,
    };

    games.push(currentGame);

    return currentGame;
}

const updateGame = (id, player, option) => {
  let currentGame = searchGame(id);

  currentGame.players[player].option = option;
  currentGame.players[player].ready = true;

  if (arePlayersReady(currentGame.players)) {
    currentGame.result = checkResult(currentGame.players);
    if (currentGame.result !== -1) {
      currentGame.players[currentGame.result].points++;
    }
  }

  return currentGame;
};

const reset = (id, player) => {
  let currentGame = searchGame(id);

  currentGame.players[player].ready = false;
  currentGame.players[player].option = null;
  currentGame.players[player].round++;
};

module.exports = {
	searchGame,
	createGame,
	updateGame,
	reset
}