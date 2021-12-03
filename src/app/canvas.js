import Dot from 'app/dot';
import Mouse from 'app/mouse';

const mouseR = 100;

export default class Canvas {
    render = () => {
        this.requestId = window.requestAnimationFrame(this.render);
        this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.rect.width, this.rect.height);
        this.pathList.map(this.renderObject);
    };

    objectInit = ({ color, list }) => ({
        color,
        list: list.map(this.dotInit),
    });

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

    renderObject = ({ color, list }) => {
        this.ctx.beginPath();
        this.dot1 = list[list.length - 1];
        list.forEach(this.lineDraw);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
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
        const trueWidth = Math.min(this.svgSize.width * height / this.svgSize.height, width);
        const trueHeight = this.svgSize.height * trueWidth / this.svgSize.width;

        this.canvas.width = trueWidth;
        this.canvas.height = trueHeight;
        this.init(this.canvas, this.svg);
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

        return {
            color: path.getAttribute('fill'),
            list: Array(dotCount).fill(0).map((_, i) => {
                const point = path.getPointAtLength(i * step);

                return {
                    x: point.x / this.svgSize.width * this.rect.width,
                    y: point.y / this.svgSize.height * this.rect.height,
                };
            }),
        };
    };

    destroy() {
        window.cancelAnimationFrame(this.requestId);
    }
}
