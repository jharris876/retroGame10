import { AxisAlignedBoundingBox } from "./axis-aligned-bounding-box";
import { Ball, BallParams } from "./ball";
import { Paddle, PaddleParams } from "./paddle";

const scale = (value: number, scalar: number) => value * scalar;

export interface GameConfig {
  field: {
    width: number,
    height: number,
  },
  paddles: {
    width: number,
    height: number,
    wallGap: number,
    speed: number,
  },
  ball: {
    speed: number,
    radius: number,
  }
};

export class Game {

  private config: GameConfig;
  private field: AxisAlignedBoundingBox;
  private leftPaddle: Paddle;
  private rightPaddle: Paddle;
  private ball: Ball;

  constructor(config: GameConfig) {

    const defaultSpawnPosition = { x: 0, y: 0 };

    // Save the config for later
    this.config = config;

    const field = AxisAlignedBoundingBox.create({
      x: defaultSpawnPosition.x,
      y: defaultSpawnPosition.y,
      w: config.field.width,
      h: config.field.height,
    });

    // Configure each paddle
    const leftPaddle = Paddle.create({
      position: defaultSpawnPosition,
      size: {
        w: config.paddles.width,
        h: config.paddles.height,
      }
    });

    const rightPaddle = Paddle.create({
      position: defaultSpawnPosition,
      size: {
        w: config.paddles.width,
        h: config.paddles.height,
      }
    });

    // Center-align paddles to field
    leftPaddle.position = field.center;
    rightPaddle.position = field.center;

    // HACK: Encapsulation Violation
    leftPaddle.box.left = field.left + config.paddles.wallGap;
    rightPaddle.box.right = field.right - config.paddles.wallGap;

    const ball = Ball.create({
      position: defaultSpawnPosition,
      size: {
        w: scale(config.ball.radius, 2),
        h: scale(config.ball.radius, 2),
      }
    });

    ball.position = field.center;

    this.field = field;
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
    this.ball = ball;
  }

  process(delta: number) {
    this.update(delta);
    // TODO: collisions
    this.draw();
  }

  private update(delta: number) {
    const p1up = keyIsDown(UP_ARROW) ? 1 : 0;
    const p1down = keyIsDown(DOWN_ARROW) ? 1 : 0;

    this.leftPaddle.velocity = [0, scale(p1down - p1up, this.config.paddles.speed)];

    this.leftPaddle.update(delta);
    this.rightPaddle.update(delta);
    this.ball.update(delta);
  }

  private draw() {
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
  }

}
