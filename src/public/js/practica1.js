function log(message) {
    console.log(message);
}

function ejercicio6(text) {
    log(text.length);
    if (text.indexOf('ipsum') != -1) {
        log('La palabra ipsum comienza en el indice ' + text.indexOf('ipsum'));
    }

    let subs = text.substring(1, 4);
    log(subs.toUpperCase());
}

function ejercicio7(a, b, c) {
    log(Math.max(a, b, c));
    return Math.pow(a + b, c);
}

function imprimirFecha(fecha) {
    log(fecha.getDate() + "/" + 
    ((fecha.getMonth() + 1) < 10 ? '0' + fecha.getMonth() : fecha.getMonth()) + 
    "/" + fecha.getFullYear() + " " + 
    fecha.getHours() + ":" + fecha.getSeconds());
}

function intercambiarValores(fecha1, fecha2) {
    fecha2.setFullYear(fecha1.getFullYear());
    fecha1.setMonth(fecha2.getMonth());
    imprimirFecha(fecha1);
    imprimirFecha(fecha2);
}