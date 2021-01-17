import Dot from 'app/dot';
import Mouse from 'app/mouse';

const mouseR = 100;

export default class Canvas {
    render = () => {
        this.requestId = window.requestAnimationFrame(this.render);
        this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.rect.width, this.rect.height);
        this.pathList.map(this.renderObject);
    };

    objectInit = (object) => object.map(this.dotInit);

    dotInit = (dotProps) => new Dot({...dotProps, r: 5});

    dotDraw = (dot) => {
        dot.proccess({
            r: mouseR,
            x: this.mouse.x,
            y: this.mouse.y,
        });
        dot.render(this.ctx);
    };

    lineDraw = (dot, key) => {
        if (this.dot1) {
            dot.proccess({
                r: mouseR,
                x: this.mouse.x,
                y: this.mouse.y,
            }, key);
            const cx1 = (this.dot1.x + dot.x) * 0.5;
            const cy1 = (this.dot1.y + dot.y) * 0.5;
            this.ctx.quadraticCurveTo(this.dot1.x, this.dot1.y, cx1, cy1);
        }

        this.dot1 = dot;
    };

    renderObject = (object) => {
        this.ctx.beginPath();
        this.dot1 = object[object.length - 1];
        object.forEach(this.lineDraw);
        this.ctx.closePath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
    };

    /**
     * Конструктор компонента.
     * @param {*} canvas Канвас.
     * @param {*} svg Список точек.
     * @return {void}
     */
    constructor(canvas, svg) {
        this.init(canvas, svg);
        this.render();
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.init(this.canvas, this.svg);
    }

    renderMouse() {
        const mouseDot = new Dot({
            r: mouseR,
            x: this.mouse.x,
            y: this.mouse.y,
        });
        mouseDot.render(this.ctx, '#44cc44');
    }

    renderImage(source) {
        this.image = new Image();
        this.image.src = source;
        this.ctx.drawImage(this.image, 0, 0, this.rect.width, this.rect.height);
    }

    init(canvas, svg) {
        this.svg = svg;
        this.svgSize = {
            height: svg.height.baseVal.value,
            width: svg.width.baseVal.value,
        };
        this.canvas = canvas;
        this.rect = this.canvas.getBoundingClientRect();
        const pathList = [...svg.querySelectorAll('path')].map(this.getPoints(100));

        this.ctx = this.canvas.getContext('2d');
        this.mouse = new Mouse(this.canvas);
        this.pathList = pathList.map(this.objectInit);
    }

    getPoints = (dotCount) => (path) => {
        const length = path.getTotalLength();
        const step = length / dotCount;

        return Array(dotCount).fill(0).map((_, i) => {
            const point = path.getPointAtLength(i * step);

            return {
                x: point.x / this.svgSize.width * this.rect.width,
                y: point.y / this.svgSize.height * this.rect.height,
            };
        });
    };

    destroy() {
        window.cancelAnimationFrame(this.requestId);
    }
}
