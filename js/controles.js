// cuando se aprieta una tecla
function keyPressed() {
  // si estamos en un menu (principal, puntos o dificultad)
  if (estado=="menu"||estado=="puntos"||estado=="dificultad") {
    if (keyCode==UP_ARROW) {
      // flecha arriba: seleccionamos la opcion de arriba
      opcionMenu = max(0, opcionMenu-1);
    } else if (keyCode==DOWN_ARROW) {
      // flecha abajo: seleccionamos la opcion de abajo
      opcionMenu = min(2, opcionMenu+1);
    } else if (keyCode==13||keyCode==32) {
      // Enter o espacio: confirmamos la seleccion
      confirmarSeleccion();
    } else if (keyCode==27) {
      // ESC: volvemos a la pantalla anterior
      if (estado=="puntos") estado="menu";
      else if (estado=="dificultad") estado="puntos";
    }
    return;
  }

  // durante la cuenta regresiva
  if (estado=="cuenta") {
    if (key=="e"||key=="E"||keyCode==27) irAlMenu(); // E o ESC: salir
    return;
  }

  // pantalla de "toca cualquier tecla para iniciar"
  if (estado=="listo") {
    if (key=="e"||key=="E"||keyCode==27) {
      irAlMenu(); // E o ESC: salir al menu
    } else {
      // cualquier otra tecla: empieza la cuenta regresiva
      estado="cuenta";
      tiempoCuenta=millis();
    }
    return;
  }

  // mientras se esta jugando (o despues de un punto)
  if (estado=="jugando"||estado=="punto") {
    if (key=="p"||key=="P") {
      estado="pausa"; // P: pausar
    } else if (key=="e"||key=="E") {
      irAlMenu(); // E: salir al menu
    }
    return;
  }

  // en la pantalla de pausa
  if (estado=="pausa") {
    if (key=="p"||key=="P") {
      estado="jugando"; // P: volver al juego
    } else if (key=="e"||key=="E") {
      irAlMenu(); // E: salir al menu
    }
    return;
  }

  // cuando termina el juego
  if (estado=="fin") {
    irAlMenu(); // cualquier tecla vuelve al menu
  }
}

// cuando se hace click con el mouse
function mousePressed() {
  // solo funciona en los menus
  if (estado=="menu"||estado=="puntos"||estado=="dificultad") {
    // el boton de dificultad es mas ancho (340) que los otros (300)
    let ancho = (estado=="dificultad") ? 340 : 300;

    // revisamos los 3 botones para ver si hicimos click en alguno
    for (let i=0; i<3; i++) {
      let x = width/2 - ancho/2;
      let y = 180 + i*66;

      // si el mouse esta adentro del boton
      if (mouseX>x && mouseX<x+ancho && mouseY>y && mouseY<y+50) {
        opcionMenu = i;// seleccionamos esta opcion
        confirmarSeleccion();// y la confirmamos
        return;
      }
    }
  }
}