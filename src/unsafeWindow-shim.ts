declare var unsafeWindow: Window;
declare var window: Window;

if (typeof unsafeWindow != 'undefined') {
    window = Object.assign({}, unsafeWindow);
}
