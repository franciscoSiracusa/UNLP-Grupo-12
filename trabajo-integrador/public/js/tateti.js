
/*  TODO
	Display X y O
	No ejecutar evento si el square ya se clickeo
	Hacer que el url tenga en la ruta el id, para que puedan jugar dos personas
*/

window.addEventListener('load', () => {
	fetch('/tateti/start')
	.then(res => res.json())
	.then(data => {
		// fetch(`/tateti/${data.id}`) TODO
	});
})

document.querySelectorAll('.square').forEach(square => {
	square.addEventListener('click', (event) => {
		// event.target.dataset.number

		fetch(`/tateti/?square=${event.target.dataset.number}`, { method: "PUT" })
	})
})

// un url principal es el general, y el del invitado cambia