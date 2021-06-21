/*  TODO
	Display X y O
	No ejecutar evento si el square ya se clickeo
	Hacer que el url tenga en la ruta el id, para que puedan jugar dos personas
*/

const pollGame = (id, winner) => {
  if (!winner) {
    fetch(`/tateti/start/?id=${id}`)
      .then(res => res.json())
      .then(data => {
        displayBoard();
        setTimeout(() => {
          pollGame(id, data.winner);
        }, 2000);
      })
  } else {
    displayWinner();
  }


}

const displayBoard = () => {
  //todo
};

const displayWinner = () => {};

window.addEventListener('load', () => {
  let currentId;
  let turn;

  if (window.location.href.split('?')[1] === undefined) {
    currentId = '-1';
    turn = "X";
  } else {
    currentId = window.location.href.split('=')[1];
    turn = "O"
  }

  fetch('/tateti/start/?id=' + currentId)
    .then((res) => res.json())
    .then((data) => {

      if (currentId === '-1') {
        document.querySelector('#urlGame').textContent =
          window.location.href + '/?id=' + data.id;
      }


      pollGame(data.id, data.winner);

      
      document.querySelectorAll('.square').forEach((square) => {
        square.addEventListener('click', (e) => {
          fetch(`/tateti/?square=${e.target.dataset.number}&id=${data.id}`, {
            method: 'PATCH',
          })
            .then((res) => res.json())
            .then((data) => {
              displayBoard(data);
              if (data.winner) {
                displayWinner();
              }
              // aca va el loop pidiendo el board
            });
        });
      });
    });
});
