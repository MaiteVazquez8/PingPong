// estado: en que pantalla estamos
// "menu" -> "puntos" -> "dificultad" -> "listo" -> "cuenta" -> "jugando"
let estado;
// modo: 0 = dos jugadores, 1 = vs computadora, 2 = practica
let modo;
// puntosMeta: a cuantos puntos hay que llegar para ganar (3, 5 o 10)
let puntosMeta;
// aumentoVel: cada vez que se anota un punto, la velocidad sube de a 1, 3 o 5
let aumentoVel;
// posicion de las palas en el eje Y (la X es fija)
let pala1Y;
let pala2Y;
// posicion de la pelota en la pantalla
let pelotaX;
let pelotaY;
// velocidad de la pelota en cada eje
let pelotaVX;
let pelotaVY;
// velPelota: la velocidad "base" que deberia tener la pelota
let velPelota;
// puntaje de cada jugador
let puntaje1;
let puntaje2;
// golpes: solo se usa en modo practica, cuenta cuantos golpes diste
let golpes;
// opcionMenu: que opcion esta seleccionada en el menu (0, 1 o 2)
let opcionMenu = 0;
// particulas: aca guardamos todas las particulas para los efectos visuales
let particulas = [];
// tiempoCuenta: cuando arranco la cuenta regresiva de 3 segundos
let tiempoCuenta;
// tiempoPunto: cuando se anoto un punto, para esperar un ratito
let tiempoPunto;
// AP = ancho de la pala, HP = alto de la pala, TP = tamaño de la pelota
let AP = 14, HP = 100, TP = 14;
//sonidos
let sonidoRebote;
let sonidoClick;
let sonidoVictoria;
let sonidoError;