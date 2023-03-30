import Game from "./game.js";

export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", (event) => {

            // Handle key press controls
            switch (event.keyCode) {
                case 37:
                    // LEFT
                    paddle.moveLeft();
                    break;

                case 39:
                    // RIGHT
                    paddle.moveRight();
                    break;

                case 27:
                    // ESCAPE
                    game.togglePause();
                    break;

                case 32:
                    // SPACEBAR
                    game.start();
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            // Handle key release controls
            switch (event.keyCode) {
                case 37:
                    // LEFT
                    if (paddle.speed < 0) {
                        paddle.stop();
                    }
                    break;

                case 39:
                    // RIGHT
                    if (paddle.speed > 0) {
                        paddle.stop();
                    }
                    break;
            }
        })
    }
}