import html from 'app/index.html';
import Jelly from 'app/jelly';
import 'app/style.less';

export default class App {
    constructor(root) {
        root.innerHTML = html;
        this.jelly = new Jelly(root);
    }

    destroy() {
        this.jelly.destroy();
    }
}
