// string.indexOf(subsrt,pos) devuelve la posicion de primera coincidencia con el parametro substr desde la pos, si no lo encuentra devuelve -1 

function log(mesagge) {
    console.log(mesagge);
}

function ejercicio6(text) {
    log(text.length) 
    if (text.indexOf("ipsum") != -1) {
        log(`La palabra ipsum se encuentra en la posicion ${text.indexOf("ipsum")}`)
    }
    let subsrt = text.substring(1,5)
    log(subsrt.toUpperCase())
}

function ejercicio7(a,b,c) {
    log(Math.pow(a+b,c))
    log(`El numero mas grande es ${Math.max(a,b,c)}`)
}

function imprimirFecha(dia) {
    log(`${dia.getDate()}/${dia.getMonth() + 1}/${dia.getFullYear()} ${dia.getHours()}:${dia.getMinutes()}`)
}

function intercambiasFechas(dia1,dia2) {
    dia2.setFullYear(dia1.getFullYear())
    dia1.setMonth(dia2.getMonth())
    imprimirFecha(dia1)
    imprimirFecha(dia2)
}

function restaFechas(dia1,dia2) {
    let millisec 
    if (dia1.getTime()>dia2.getTime()) {
        millisec = dia1.getTime()- dia2.getTime()
    } else {
        millisec = dia2.getTime()- dia1.getTime()
    }
    const cambioAdia = 1000*60*60*24
    millisec= millisec/cambioAdia
    return millisec
}
