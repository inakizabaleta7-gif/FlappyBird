export default class TomasController {
  constructor(jump) {
    /*
    */
    this.jump = jump;
    this.name = 'Tomás';
  }

  loop(birdData, pipes, scene, dt) {
    
    const nextPipe = pipes.find(pipe => pipe.x + pipe.pipeWidth > birdData.x - 30);

    let targetY = (scene.height - scene.floor) / 2;

    if (nextPipe) {
      if (nextPipe.isTop) {
        targetY = nextPipe.pipeHeight + 120;
      } else {
        targetY = (scene.height - nextPipe.pipeHeight) - 70;
      }
    }

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


    const jumpApex = birdData.y - 105;
    const hitsTop = nextPipe && nextPipe.isTop && nextPipe.x < birdData.x + 200 && jumpApex < nextPipe.pipeHeight + 45;

    if (!hitsTop && birdData.y > targetY && birdData.speed >= 0) {
      this.jump(1);
    }
  }
}

export const color = 0xff00ff;