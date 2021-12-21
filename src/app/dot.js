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

    proccess(object) {
        this.time = +new Date();
        this.react(object);
        this.prepare();
        this.pos();
    }

    react({key = 1, r, scale, x, y}) {
        const dx = this.x - x;
        const dy = this.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const max = r + this.r;

        if (dist < max) {
            const angle = Math.atan2(dy, dx);

            this.vx += x + Math.cos(angle) * max - this.x;
            this.vy += y + Math.sin(angle) * max - this.y;
        }
        const koef = Math.round(scale * (this.time / 2000 + key * 5));
        this.vx += Math.cos(koef);
        this.vy += Math.sin(koef);
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
