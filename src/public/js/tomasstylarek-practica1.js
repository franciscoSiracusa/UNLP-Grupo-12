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

function restaFechas(fecha1, fecha2) {
    let miliseg;
    
    if (fecha1.getTime() > fecha2.getTime()) {
        miliseg = fecha1.getTime() - fecha2.getTime();
    } else {
        miliseg = fecha2.getTime()- fecha1.getTime();
    }
    
    const cambioHora = 1000 * 60 * 60 * 24;
    
    let dias = miliseg / cambioHora;
    return dias;
}
