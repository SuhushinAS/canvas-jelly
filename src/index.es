import App from 'app/index.es';
// import 'style/index.less';

const root = document.body;

if (root) {
    let app = new App(root);

    if (module.hot) {
        module.hot.accept('app/index.es', () => {
            const HotApp = require('app/index.es').default;
            app.destroy();

            app = new HotApp(root);
        });
    }
}
