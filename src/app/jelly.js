import Canvas from 'app/canvas';

export  default class Jelly {
    constructor(root) {
        this.root = root;
        this.init();
        this.bind();
    }

    init() {
        const canvas = this.root.querySelector('.canvas');
        const svg = this.root.querySelector('.svg');
        this.canvas = new Canvas(canvas, svg);
    }

    bind() {
        window.removeEventListener('resize', this.handleResize);
        window.addEventListener('resize', this.handleResize);
        window.dispatchEvent(new Event('resize'));
    }

    handleResize = (e) => {
        const {innerHeight, innerWidth} = e.target;

        this.canvas.setSize(innerWidth, innerHeight);
    };

    destroy() {
        this.canvas.destroy();
    }
}
