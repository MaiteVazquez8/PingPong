// dibuja la cancha: linea del medio, borde y circulo
function dibujarCancha() {
  // borde de la cancha
  noFill();
  stroke(114, 79, 168, 25);
  strokeWeight(1);
  rect(20, 20, width-40, height-40);

  // linea punteada del medio
  stroke(171, 134, 219, 40);
  strokeWeight(1);
  drawingContext.setLineDash([6, 12]);
  line(width/2, 0, width/2, height);
  drawingContext.setLineDash([]);

  // circulo central
  noFill();
  stroke(114, 79, 168, 25);
  strokeWeight(1);
  ellipse(width/2, height/2, 80, 80);
}

// dibuja una pala estilo minimalista
// x, y: posicion, txt: texto que va abajo
function dibujarPala(x, y, txt) {
  // relleno semi-transparente
  fill(171, 134, 219, 12);
  stroke(171, 134, 219, 180);
  strokeWeight(2);
  rect(x, y, AP, HP, 4);

  // texto debajo de la pala
  if (txt != "") {
    fill(243, 232, 255, 50);
    noStroke();
    textAlign(CENTER);
    textSize(9);
    text(txt, x+AP/2, y+HP+14);
  }
}

// dibuja la pelota redonda
function dibujarPelota() {
  fill(243, 232, 255);
  noStroke();
  ellipse(pelotaX, pelotaY, TP);
}

// dibuja las dos palas (o solo una en modo practica)
function dibujarPalas() {
  dibujarPala(35, pala1Y, "W/S");
  if (modo != 2) {
    if (modo == 1) {
      dibujarPala(width-49, pala2Y, "CPU");
    } else {
      dibujarPala(width-49, pala2Y, String.fromCharCode(8593)+"/"+String.fromCharCode(8595));
    }
  }
}

// dibuja el marcador con los puntajes arriba
function dibujarMarcador() {
  // linea decorativa arriba del marcador
  stroke(196, 171, 232, 30);
  strokeWeight(1);
  line(width/2-60, 32, width/2+60, 32);

  // puntajes
  fill(114, 79, 168);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  if (modo == 2) {
    text(golpes+" : ∞", width/2, 14);
  } else {
    text(puntaje1+" : "+puntaje2, width/2, 14);
  }

  // texto chiquito arriba
  fill(114, 79, 168, 100);
  textSize(8);
  if (modo == 2) {
    text("Golpes", width/2, 30);
  } else {
    text(puntosMeta+" pts", width/2, 30);
  }
}

// dibuja un boton del menu
// act = true si esta seleccionado
function dibujarBoton(x, y, w, h, txt, act) {
  if (act) {
    fill(114, 79, 168, 18);
    stroke(171, 134, 219, 200);
  } else {
    fill(171, 134, 219, 5);
    stroke(114, 79, 168, 35);
  }
  strokeWeight(1);
  rect(x, y, w, h, 4);

  fill(act ? 243 : 114, act ? 232 : 79, act ? 255 : 168);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text(txt, x+w/2, y+h/2+1);
}