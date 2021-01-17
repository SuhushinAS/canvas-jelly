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
        const height = e.target.innerHeight;
        const width = e.target.innerWidth;
        const size = Math.min(height, width);
        this.canvas.setSize(size, size);
    };

    destroy() {
        this.canvas.destroy();
    }
}
