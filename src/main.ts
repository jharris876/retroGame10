import { Game } from "./game";

const game = new Game({
  paddles: {
    width: 16,
    height: 64,
    wallGap: 64,
    speed: 0.25,
  },
  ball: {
    radius: 8,
    speed: 0.2,
    verticalEnglish: 0.05,
  },
  field: {
    width: 400,
    height: 400,
  },
  inputs: {     // Defaults Only
    p1: {
      up: 65,   // A
      down: 90, // Z
    },
    p2: {
      up: 75,   // K
      down: 77, // M
    }
  }
});


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  game.process(deltaTime);
}

(window as any).setup = setup;
(window as any).draw = draw;
