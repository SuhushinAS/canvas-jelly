export default class Mouse {
    handleMove = (e) => {
        e.preventDefault();
        const clientX = e.clientX || e.targetTouches[0].clientX;
        const clientY = e.clientY || e.targetTouches[0].clientY;
        this.x = clientX - this.rect.left;
        this.y = clientY - this.rect.top;
    };

    constructor(canvas) {
        this.canvas = canvas;
        this.rect = this.canvas.getBoundingClientRect();
        this.x = 0;
        this.y = 0;
        this.bind();
    }

    bind() {
        this.canvas.removeEventListener('mousemove', this.handleMove);
        this.canvas.addEventListener('mousemove', this.handleMove);
        this.canvas.removeEventListener('touchmove', this.handleMove);
        this.canvas.addEventListener('touchmove', this.handleMove);
    }
}
