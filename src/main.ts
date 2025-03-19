import { Game } from "./game";

const game = new Game({
  score: {
    textSize: 24,
    limit: 7,
  },
  paddles: {
    width: 4,
    height: 96,
    wallGap: 64,
    speed: 0.25,
  },
  ball: {
    radius: 6,
    initialSpeed: 0.2,
    speedStep: 0.05,
    verticalEnglish: 0.05,
    activationDelay: 1200,
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
  textAlign(CENTER, CENTER);
  textSize(game.config.score.textSize);
  fill(255, 176, 0); // AMBER-CRT
}

function draw() {
  background(0);
  game.process(deltaTime);
}

(window as any).setup = setup;
(window as any).draw = draw;
