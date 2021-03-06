export default class Dot {
    constructor(props) {
        this.init(props);
    }

    init({friction = 0.1, r = 2, tension = 0.9, x = 0, y = 0}) {
        this.friction = friction;
        this.r = r;
        this.ox = x;
        this.oy = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.tension = tension;
    }

    proccess(object, key) {
        this.time = +new Date();
        this.react(object, key);
        this.prepare();
        this.pos();
    }

    react(object, key = 1) {
        const dx = this.x - object.x;
        const dy = this.y - object.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const max = object.r + this.r;

        if (dist < max) {
            const angle = Math.atan2(dy, dx);

            this.vx += object.x + Math.cos(angle) * max - this.x;
            this.vy += object.y + Math.sin(angle) * max - this.y;
        }
        const koef = Math.round(this.time / 600 + key / 6);
        this.vx += Math.cos(koef) * 2;
        this.vy += Math.sin(koef) * 2;
    }

    prepare() {
        const tx = this.x - this.ox;
        const ty = this.y - this.oy;

        this.vx -= tx * this.tension;
        this.vy -= ty * this.tension;

        this.vx *= this.friction;
        this.vy *= this.friction;
    }

    pos() {
        this.x += this.vx;
        this.y += this.vy;
    }

    render(ctx, fillStyle = '#ff4444') {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
