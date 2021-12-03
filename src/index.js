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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/evrone-jelly/sw.js').catch((registrationError) => {
            console.error('SW registration failed: ', registrationError);
        });
    });
}
