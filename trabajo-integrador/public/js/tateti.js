/*  TODO
	Display X y O
	No ejecutar evento si el square ya se clickeo
	Hacer que el url tenga en la ruta el id, para que puedan jugar dos personas
*/
const displayBoard = () => {
  //todo
};

const displayWinner = () => {};

window.addEventListener('load', () => {
  let currentId =
    window.location.href.split('?')[1] === undefined
      ? '-1'
      : window.location.href.split('?')[1]; // id actual de la pagina
  fetch('/tateti/start/?id=' + currentId)
    .then((res) => res.json())
    .then((data) => {
      let turn = data.turn;

      if (currentId === '-1') { // hay que cambiar el -1 para que sea un string, como en controllers
        document.querySelector('#urlGame').textContent =
          window.location.href + '/?id=' + data.id;
      }


      console.log(data.id)

      document.querySelectorAll('.square').forEach((square) => {
        square.addEventListener('click', (e) => {
          fetch(`/tateti/?square=${e.target.dataset.number}&id=${data.id}`, {
            method: 'PATCH',
          })
            .then(fetch('/tateti/updated'))
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
