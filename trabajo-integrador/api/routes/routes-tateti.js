const { Router } = require('express');
const router = Router();
const tatetiControllers = require('../controllers/tateti-controllers');

router.get('/tateti', (req, res) => {
  res.sendFile('/public/tateti.html', { root: process.cwd() });
});

router.put('/tateti', (req, res) => {
  console.log(req.query.square);

  /* gameData.board[req.query.square] = gameData.turn;
  gameData.turn = gameData.turn === 'X' ? 'O' : 'X';
 */

  /* console.log(gameData); */
});

router.get('/tateti/start', tatetiControllers.initializeGame);

module.exports = router;
