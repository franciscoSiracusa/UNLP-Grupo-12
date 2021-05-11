/* EJERCICIO1 */
var jsonStr =
  '[' +
  '{"name":"Alice","dob": "20010304T00:00:00.000Z","h": 165,"w": 68},' +
  '{"name":"Robert","dob": "19970131T00:00:00.000Z","h": 170,"w": 88},' +
  '{"name":"Charles","dob": "19781015T00:00:00.000Z","h": 188,"w": 102},' +
  '{"name":"Lucía","dob": "19550807T00:00:00.000Z","h": 155,"w": 61},' +
  '{"name":"Peter","dob": "19880309T00:00:00.000Z","h": 165,"w": 99},' +
  '{"name":"Lucas","dob": "19101204T00:00:00.000Z","h": 172,"w": 75}]';

function overweightNames(people) {
  return people
    .filter((p) => p.w / Math.pow(p.h / 100, 2) > 25)
    .map((p) => p.name)
    .reduce((n1, n2) => n1 + ', ' + n2);
}

console.log(overweightNames(JSON.parse(jsonStr)));

/* EJERCICIO 2 */
function stateChangeHandler() {
  console.log(
    'Ready state: ' +
      this.readyState +
      '. Status: ' +
      this.status +
      ' ' +
      this.statusText +
      '. Response: ' +
      this.responseText
  );
}
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = stateChangeHandler;
xhttp.open('GET', 'https://aws.random.cat/meow', true);
xhttp.send();
//True significa que es asincronico
// 4 veces, cada vez que cambia readyState
// Significan ; 0: request no inicializado; 1: conexión con el server establecida; 2: request recibido; 3: procesando un request; 4: request terminado la respuesta está disponible
// preguntar
//
