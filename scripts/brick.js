import { detectCollision } from "./collisonDetection.js"

export const BRICK_WIDTH = 80;
export const BRICK_HEIGHT = 30;

export default class Brick {
    constructor(game, position) {
        this.image = document.getElementById("img_brick");

        this.game = game;

        this.position = position;
        this.width = BRICK_WIDTH;
        this.height = BRICK_HEIGHT;

        this.markedForDeletion = false;
    }

    update(dt) {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, BRICK_WIDTH, BRICK_HEIGHT);
    }
}