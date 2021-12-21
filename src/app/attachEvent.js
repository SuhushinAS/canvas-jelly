/**
 * Привязать событие.
 * @param {*} el Елемент.
 * @param {*} event Событие.
 * @param {*} handler Обработчик.
 */
export function attachEvent(el, event, handler) {
    el.removeEventListener(event, handler);
    el.addEventListener(event, handler);
}
