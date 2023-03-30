import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js"
import { buildLevel, level1, level2 } from "./levels.js"
import Heart from "./heart.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
};

const LIVES = 3 ;

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.initialiseHearts();
        this.lives = LIVES;

        this.levels = [level1, level2];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL && this.gamestate !== GAMESTATE.GAMEOVER) {
            return;
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            // Reset the game
            this.currentLevel = 0;
            this.lives = LIVES;
            this.initialiseHearts();
        }

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.paddle.reset();
        this.gameObjects = [
            this.ball,
            this.paddle
        ]

        this.gamestate = GAMESTATE.RUNNING;
    }

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

    initialiseHearts() {
        this.hearts = [];
        for (let i = 0; i < LIVES; i++) {
            this.hearts.push(new Heart({x: 5 + i * 20, y: 5}));
        }
    }

    update(dt) {
        if (this.lives === 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) {
            return;
        }

        if (this.bricks.length === 0) {
            // Move to next level
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        // Join gameObjects and bricks arrays into one and update
        [...this.gameObjects, ...this.bricks].forEach(obect => obect.update(dt));

        // Check bricks to be deleted
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

        // Update hearts array to be equal length of number of lives so correct number of hearts are displayed
        this.hearts = this.hearts.slice(0, this.lives);
    }

    draw(ctx) {
        // Join gameObjects and bricks arrays into one and draw
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));



        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText("Press SPACEBAR to play again", this.gameWidth / 2, this.gameHeight / 2 + 100);
        }

        if (this.gamestate !== GAMESTATE.GAMEOVER && this.gamestate !== GAMESTATE.MENU) {
            // Hearts are drawn outside of gameObjects
            this.hearts.forEach((object) => object.draw(ctx));
        }
    }
}