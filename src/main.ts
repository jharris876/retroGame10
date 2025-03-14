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
  },
  field: {
    width: 400,
    height: 400,
  },
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
