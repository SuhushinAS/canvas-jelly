import Canvas from 'canvas.es';
import 'style.less';

class Jelly {
    constructor() {
        this.init();
        this.bind();
    }

    init() {
        this.canvasEl = document.querySelector('.canvas');
        this.svgEl = document.querySelector('.svg');
        this.canvas = new Canvas(this.canvasEl, this.svgEl);
    }

    bind() {
        window.removeEventListener('resize', this.handleResize);
        window.addEventListener('resize', this.handleResize);
        window.dispatchEvent(new Event('resize'));
    }

    handleResize = (e) => {
        const height = e.target.innerHeight;
        const width = e.target.innerWidth;
        const size = Math.min(height, width);
        this.canvas.setSize(size, size);
    };
}

(function() {
    new Jelly();
})();
