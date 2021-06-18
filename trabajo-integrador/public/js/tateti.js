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
      : window.location.href.split('?')[1];

  fetch('/tateti/start/?id=' + currentId) //window.location.href = localHost:3000/tateti/?id=13123124
    .then((res) => res.json())
    .then((data) => {
      document.querySelector('#urlGame').textContent =
        window.location + '/?id=' + data.id;
      document.querySelectorAll('.square').forEach((square) => {
        square.addEventListener('click', (e) => {
          fetch(`/tateti/?square=${e.target.dataset.number}`, {
            method: 'PUT',
          })
            .then(fetch('/tateti/updated'))
            .then((res) => res.json())
            .then((data) => {
              displayBoard(data);
              if (data.winner) {
                displayWinner();
              }
            });
        });
      });
    });
});
