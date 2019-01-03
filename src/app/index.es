import html from './index.html';
import Jelly from './jelly.es';
import './style.less';

export default class App {
    constructor(root) {
        root.innerHTML = html;
        this.jelly = new Jelly(root);
    }

    destroy() {
        // console.log("App.destroy");
        this.jelly.destroy();
    }
}
