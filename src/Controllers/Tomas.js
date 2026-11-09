export default class TomasController {
  constructor(jump) {
    /*
    */
    this.jump = jump;
    this.name = 'inaki';
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
    let salto = birdData.y >= floorLimit;

    if (nextPipe && !nextPipe.isTop && nextPipe.x < birdData.x + 35) {
      const pipeTop = (scene.height - nextPipe.pipeHeight) - 45;
      if (birdData.y >= pipeTop) {
        salto = true;
      }
    }

    if (salto) {
      this.jump(1);
      return;
    }



   
  }
}

export const color = 0xff00ff;