# Ping Pong

## Como jugar

### Menu inicial
Usa las flechas para moverte entre las opciones y Enter para elegir.

### Modos de juego
| Modo | Que es |
|------|--------|
| 2 Jugadores | Dos personas en la misma compu |
| vs Computadora | Contra la computadora |
| Practica | Solo, la pelota rebota en las paredes. Contas los golpes |

### Controles

**Jugador 1 (izquierda)**
- W: mover arriba
- S: mover abajo

**Jugador 2 (derecha)**
- Flecha arriba: mover arriba
- Flecha abajo: mover abajo

### Teclas generales
- P: pausa
- E: salir al menu
- ESC: volver atras

### Opciones
- **Puntos**: se juega a 3, 5 o 10 puntos
- **Velocidad**: cada vez que alguien anota, la velocidad sube
  - Facil: +1 por punto
  - Medio: +3 por punto
  - Dificil: +5 por punto

## Archivos

- `index.html` - la pagina principal, carga todo
- `libraries/p5.min.js` - la libreria p5.js
- `js/variables.js` - todas las variables del juego
- `js/dibujo.js` - funciones para dibujar la cancha, palas, pelota, etc
- `js/menu.js` - las pantallas de menu (inicio, opciones, pausa, fin)
- `js/juego.js` - la logica del juego (movimiento, colisiones, particulas)
- `js/controles.js` - el teclado y el mouse
