// dibuja el titulo "PING PONG" y un subtitulo
function dibujarTitulo(sub) {
  // titulo principal en ambar
  fill(171, 134, 219);
  textAlign(CENTER, CENTER);
  textSize(44);
  text("PING PONG", width/2, 75);

  // subtitulo
  fill(214, 197, 240, 70);
  noStroke();
  textSize(12);
  text(sub, width/2, 130);
}

// pantalla principal del menu: elegir modo de juego
function dibujarMenu() {
  dibujarTitulo("Selecciona el modo de juego");

  let opciones = ["2 Jugadores", "vs Computadora", "Practica"];
  for (let i=0; i<3; i++) {
    let x = width/2-150;
    let y = 180 + i*66;
    dibujarBoton(x, y, 300, 50, opciones[i], opcionMenu==i);
  }

  fill(214, 197, 240, 30);
  textSize(10);
  text("Flechas - Enter - ESC", width/2, height-30);
}

// pantalla para elegir a cuantos puntos se juega
function dibujarPantallaPuntos() {
  dibujarTitulo("A cuantos puntos jugamos?");

  let opciones = ["3 Puntos", "5 Puntos", "10 Puntos"];
  for (let i=0; i<3; i++) {
    let x = width/2-150;
    let y = 180 + i*66;
    dibujarBoton(x, y, 300, 50, opciones[i], opcionMenu==i);
  }

  fill(196, 171, 232, 30);
  textSize(10);
  text("Flechas - Enter - ESC", width/2, height-30);
}

// pantalla para elegir la velocidad de aumento
function dibujarPantallaDificultad() {
  dibujarTitulo("Velocidad de aumento");

  let opciones = ["Facil (+1)", "Medio (+3)", "Dificil (+5)"];
  for (let i=0; i<3; i++) {
    let x = width/2-170;
    let y = 180 + i*66;
    dibujarBoton(x, y, 340, 50, opciones[i], opcionMenu==i);
  }

  fill(196, 171, 232, 30);
  textSize(10);
  text("Flechas - Enter - ESC", width/2, height-30);
}

// pantalla antes de empezar: "toca cualquier tecla"
function dibujarPantallaListo() {
  dibujarPalas();
  dibujarPelota();
  dibujarMarcador();

  // texto que parpadea
  let op = 180 + 75*sin(frameCount*0.04);
  fill(196, 171, 232, op);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text("TOCA CUALQUIER TECLA PARA INICIAR", width/2, height/2+80);

  // comandos
  fill(214, 197, 240, 35);
  textSize(10);
  text("[P] Pausa - [E] Salir", width/2, height-20);
}

// pantalla de pausa: se ve el juego detenido atras
function dibujarPantallaPausa() {
  dibujarPalas();
  dibujarPelota();
  dibujarMarcador();

  // capa oscura encima
  fill(6, 14, 16, 180);
  noStroke();
  rect(0, 0, width, height);

  // texto PAUSA
  fill(214, 197, 240);
  textAlign(CENTER, CENTER);
  textSize(42);
  text("PAUSA", width/2, height/2-10);

  // opciones
  fill(171, 134, 219, 100);
  textSize(13);
  text("[P] Volver - [E] Salir", width/2, height/2+30);
}

// pantalla de fin del juego: muestra quien gano
function dibujarPantallaFin() {
  // dibujamos las palas sin texto
  dibujarPala(35, pala1Y, "");
  if (modo != 2) dibujarPala(width-49, pala2Y, "");

  // fondo oscuro para el texto
  fill(6, 14, 16, 160);
  noStroke();
  rect(0, height/2-90, width, 180);

  // averiguamos quien gano
  let gan, txt;
  if (modo == 1) {
    if (puntaje1 > puntaje2) {
      gan = "Jugador"; txt = "GANASTE!";
    } else {
      gan = "Computadora"; txt = "PERDISTE!";
    }
  } else {
    if (puntaje1 > puntaje2) {
      gan = "Jugador 1"; txt = "GANO!";
    } else {
      gan = "Jugador 2"; txt = "GANO!";
    }
  }

  // ganador
  fill(171, 134, 219);
  textAlign(CENTER, CENTER);
  textSize(34);
  text(gan+" "+txt, width/2, height/2-40);

  // resultado
  fill(171, 134, 219, 180);
  textSize(22);
  text(puntaje1+" - "+puntaje2, width/2, height/2+15);

  // instruccion para volver
  fill(114, 79, 168, 60);
  textSize(11);
  text("Presiona cualquier tecla", width/2, height/2+55);
}