// setup: se ejecuta una vez al inicio
function setup() {
  createCanvas(800, 600);
  irAlMenu();
}

// draw: se ejecuta 60 veces por segundo
function draw() {
  // fondo oscuro con tono calido
  background(6, 14, 16);
  dibujarCancha();

  // segun en que pantalla estamos, hacemos una cosa u otra
  if (estado=="menu") dibujarMenu();
  else if (estado=="puntos") dibujarPantallaPuntos();
  else if (estado=="dificultad") dibujarPantallaDificultad();
  else if (estado=="listo") dibujarPantallaListo();
  else if (estado=="cuenta") actualizarCuentaRegresiva();
  else if (estado=="jugando") actualizarJuego();
  else if (estado=="pausa") dibujarPantallaPausa();
  else if (estado=="fin") dibujarPantallaFin();
  else if (estado=="punto") actualizarEsperaPunto();

  // las particulas se dibujan siempre
  actualizarParticulas();
}

// vuelve todo al estado inicial del menu
function irAlMenu() {
  estado="menu"; opcionMenu=0; modo=-1; puntosMeta=-1; aumentoVel=1;
  puntaje1=0; puntaje2=0; golpes=0; particulas=[];
  pelotaX=width/2; pelotaY=height/2; pelotaVX=0; pelotaVY=0;
  pala1Y=height/2-50; pala2Y=height/2-50;
}

// confirma la opcion seleccionada en el menu y avanza
function confirmarSeleccion() {
  if (estado=="menu") {
    modo=opcionMenu; opcionMenu=0; estado="puntos";
  }
  else if (estado=="puntos") {
    puntosMeta=[3,5,10][opcionMenu]; opcionMenu=0; estado="dificultad";
  }
  else if (estado=="dificultad") {
    aumentoVel=[1,3,5][opcionMenu]; opcionMenu=0;
    pala1Y=height/2-50; pala2Y=height/2-50;
    pelotaX=width/2; pelotaY=height/2; pelotaVX=0; pelotaVY=0;
    puntaje1=0; puntaje2=0; golpes=0; particulas=[];
    estado="listo";
  }
}

// muestra la cuenta regresiva 3, 2, 1
function actualizarCuentaRegresiva() {
  dibujarPalas(); dibujarPelota(); dibujarMarcador();

  let t = millis()-tiempoCuenta;
  let n = ceil((3000-t)/1000);

  if (n<=0) { estado="jugando"; reiniciarPelota(); return; }

  // numero grande que se desvanece
  let p = ((3000-t)%1000)/1000;
  fill(255, 180, 30, 255*(1-p));
  noStroke(); textAlign(CENTER, CENTER); textSize(60+140*(1-p));
  text(""+n, width/2, height/2);
}

// ============== LOGICA DEL JUEGO ==============

function actualizarJuego() {
  // mover pala del jugador 1 (W arriba, S abajo)
  if (keyIsDown(87)) pala1Y=constrain(pala1Y-6, 10, height-HP-10);
  if (keyIsDown(83)) pala1Y=constrain(pala1Y+6, 10, height-HP-10);

  // mover pala del jugador 2 o la computadora
  if (modo==0) {
    if (keyIsDown(UP_ARROW)) pala2Y=constrain(pala2Y-6, 10, height-HP-10);
    if (keyIsDown(DOWN_ARROW)) pala2Y=constrain(pala2Y+6, 10, height-HP-10);
  } else if (modo==1) {
    let d = (pelotaY-HP/2)-pala2Y;
    if (d>5) pala2Y+=4.5;
    else if (d<-5) pala2Y-=4.5;
    pala2Y=constrain(pala2Y, 10, height-HP-10);
  }

  // mover la pelota
  pelotaX+=pelotaVX;
  pelotaY+=pelotaVY;

  // rebotar en el techo y el piso
  if (pelotaY<TP/2) { pelotaY=TP/2; pelotaVY=-pelotaVY; }
  if (pelotaY>height-TP/2) { pelotaY=height-TP/2; pelotaVY=-pelotaVY; }

  // revisar colisiones con las palas
  if (modo==2) {
    if (pelotaX<TP/2) { pelotaX=TP/2; pelotaVX=-pelotaVX; }
    if (pelotaX>width-TP/2) { pelotaX=width-TP/2; pelotaVX=-pelotaVX; }
    revisarGolpePala(35, pala1Y, true);
  } else {
    revisarGolpePala(35, pala1Y, true);
    revisarGolpePala(width-49, pala2Y, false);
  }

  // revisar si alguien anoto un punto
  if (modo!=2) {
    if (pelotaX<-30) {
      particulasPunto(0, pelotaY);
      puntaje2++;
      if (puntaje2>=puntosMeta) {
        estado="fin";
        dibujarPalas(); dibujarPelota(); dibujarMarcador();
        return;
      }
      estado="punto"; tiempoPunto=millis();
    }
    else if (pelotaX>width+30) {
      particulasPunto(width, pelotaY);
      puntaje1++;
      if (puntaje1>=puntosMeta) {
        estado="fin";
        dibujarPalas(); dibujarPelota(); dibujarMarcador();
        return;
      }
      estado="punto"; tiempoPunto=millis();
    }
  }

  dibujarPalas(); dibujarPelota(); dibujarMarcador();
}

// revisa si la pelota golpea una pala
function revisarGolpePala(px, py, izq) {
  if (pelotaX+TP/2>px && pelotaX-TP/2<px+AP && pelotaY+TP/2>py && pelotaY-TP/2<py+HP) {
    let pos = constrain((pelotaY-py-HP/2)/(HP/2), -1, 1);
    let ang = pos*PI/4;
    let v = max(sqrt(pelotaVX*pelotaVX+pelotaVY*pelotaVY), velPelota);

    if (izq) {
      pelotaVX=abs(cos(ang))*v;
      pelotaVY=sin(ang)*v;
      pelotaX=px+AP+TP/2+1;
    } else {
      pelotaVX=-abs(cos(ang))*v;
      pelotaVY=sin(ang)*v;
      pelotaX=px-TP/2-1;
    }
    particulasGolpe(pelotaX, pelotaY);
    if (modo==2) golpes++;
  }
}

// espera un momento despues de que se anota un punto
function actualizarEsperaPunto() {
  dibujarPalas(); dibujarPelota(); dibujarMarcador();
  if (millis()-tiempoPunto>1200) {
    reiniciarPelota();
    estado="jugando";
  }
}

// pone la pelota en el centro y le da direccion aleatoria
function reiniciarPelota() {
  pelotaX=width/2;
  pelotaY=height/2;

  if (modo==2) {
    velPelota = 8 + golpes * aumentoVel;
  } else {
    velPelota = 8 + (puntaje1+puntaje2) * aumentoVel;
  }

  let a = random(-PI/5, PI/5);
  if (random()<0.5) a += PI;

  pelotaVX = cos(a)*velPelota;
  pelotaVY = sin(a)*velPelota;
}

// ============== PARTICULAS ==============

// actualiza todas las particulas: las mueve, las dibuja y borra las muertas
function actualizarParticulas() {
  for (let i=particulas.length-1; i>=0; i--) {
    let p = particulas[i];
    p[0] += p[2]; // x += vx
    p[1] += p[3]; // y += vy
    if (p[10] > 0) p[3] += p[10]; // gravedad
    p[2] *= 0.97;
    p[3] *= 0.97;
    p[7]--; // restar vida

    if (p[7] <= 0) {
      particulas.splice(i, 1);
      continue;
    }

    // opacidad y tamaño segun la vida
    let op = map(p[7], 0, p[8], 0, 255);
    let sz = p[9] * map(p[7], 0, p[8], 0.1, 1);

    fill(p[4], p[5], p[6], op);
    noStroke();
    ellipse(p[0], p[1], max(sz, 1));
  }
}

// crea particulas cuando la pelota golpea una pala
function particulasGolpe(x, y) {
  for (let i=0; i<12; i++) {
    let a = random(TWO_PI);
    let v = random(2, 5);
    particulas.push([x, y, cos(a)*v, sin(a)*v, 255, 180, 30, 30, 30, random(3,6), 0]);
  }
}

// crea muchas particulas cuando alguien anota un punto
function particulasPunto(x, y) {
  let cols = [[255,200,50],[255,180,30],[230,150,20],[200,160,40],[255,210,70],[240,170,10]];
  for (let i=0; i<50; i++) {
    let a = random(TWO_PI);
    let v = random(2, 8);
    let c = random(cols);
    particulas.push([x, y, cos(a)*v, sin(a)*v, c[0], c[1], c[2], 60, 60, random(4,10), 0.04]);
  }
}