/* ejercicio 5 */
function log(message) {
  console.log(message)
}

/* ejericicio 6 */
function ejercicio6(string) {
  log(string.length)
  log(string.indexOf('ipsum'))
  log(string.slice(1, 5).toUpperCase())
}

/* ejercicio 7 */
function ejercicio7(a, b, c) {
  log(Math.pow(a + b, c))
  log(Math.max(a, b, c))
}

function numeroAleatorio() {
  return Math.floor(Math.random() * 100)
}

/* EJERCICIO 8 */
function imprimirFecha(date) {
  log(
    date.getDate() +
      '/' +
      date.getMonth() + // milton dice: faltaria sumarle 1 porque los meses los devuelve de 0 a 11 https://lenguajejs.com/javascript/fechas/date-fechas-nativas/#getters-obtener-fechas
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
  )
}

function intercambiarFechas(dia1, dia2) {
  dia2.setFullYear(dia1.getFullYear())
  dia1.setMonth(dia2.getMonth())
}

function diferenciaFechas(fecha1, fecha2) {
  if (fecha1.getTime() > fecha2.getTime()) {
    return fecha1.getTime() - fecha2.getTime()
  } else {
    return fecha2.getTime() - fecha1.getTime()
  }
}
