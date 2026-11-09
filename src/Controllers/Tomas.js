export default class TomasController {
  constructor(jump) {
    /*
    ** Jump es una función que acepta una fuerza de salto (1-3) y hace saltar al pájaro.
    */
    this.jump = jump;
    this.name = 'Tomás';
  }

  loop(birdData, pipes, scene, dt) {
    // 1. Buscamos la próxima tubería que tengamos delante o encima
    const nextPipe = pipes.find(pipe => pipe.x + pipe.pipeWidth > birdData.x - 30);

    // 2. Altura ideal a la que queremos volar (centro de la pantalla por defecto)
    let targetY = (scene.height - scene.floor) / 2;

    if (nextPipe) {
      if (nextPipe.isTop) {
        // Tubería de arriba: volamos por debajo
        targetY = nextPipe.pipeHeight + 120;
      } else {
        // Tubería de abajo: volamos por encima
        targetY = (scene.height - nextPipe.pipeHeight) - 70;
      }
    }

    // 3. Salvar el suelo o una tubería inferior inmediata
    const floorLimit = scene.height - scene.floor - 45;
    let bottomDanger = birdData.y >= floorLimit;

    if (nextPipe && !nextPipe.isTop && nextPipe.x < birdData.x + 35) {
      const pipeTop = (scene.height - nextPipe.pipeHeight) - 45;
      if (birdData.y >= pipeTop) {
        bottomDanger = true;
      }
    }

    if (bottomDanger) {
      this.jump(1);
      return;
    }

    // 4. Salto normal hacia la altura objetivo
    // Evitamos saltar si el salto nos estamparía contra la tubería superior
    const jumpApex = birdData.y - 105;
    const hitsTop = nextPipe && nextPipe.isTop && nextPipe.x < birdData.x + 200 && jumpApex < nextPipe.pipeHeight + 45;

    if (!hitsTop && birdData.y > targetY && birdData.speed >= 0) {
      this.jump(1);
    }
  }
}

export const color = 0xff00ff;
