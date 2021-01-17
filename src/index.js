import App from 'app/index';
import 'style/index.less';

const root = document.body;
let app;

if (root) {
    app = new App(root);

    if (module.hot) {
        module.hot.accept('app/index', () => {
            app.destroy();

            app = new App(root);
        });
    }
}
