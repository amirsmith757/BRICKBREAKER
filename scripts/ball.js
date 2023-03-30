import { detectCollision } from "./collisonDetection.js"

export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.size = 16;
        this.reset();
    }

    reset() {
        this.speed = { x: 1, y: -1 };
        this.position = {
            x: 10,
            y: 400
        };
    }

    update(dt) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // wall LEFT / RIGHT
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        // wall TOP
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        // wall BOTTOM
        if (this.position.y + this.size > this.gameHeight) {
            // Lose a life and reset the ball to start position
            this.game.lives--;
            this.reset();
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }

    draw(ctx) {
        // Draw the ball
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}