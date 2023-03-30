const HEART_WIDTH = 16;
const HEART_HEIGHT = 16;

export default class Heart {
    constructor(position) {
        this.image = document.getElementById("img_heart");

        this.position = position;
        this.width = HEART_WIDTH;
        this.height = HEART_HEIGHT;
    }

    update(dt) { }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, HEART_WIDTH, HEART_HEIGHT);
    }
}