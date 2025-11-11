import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const toast = (msg) => Toastify({
    text: msg,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () { } // Callback after click
}).showToast();

export { toast };