'use strict';

const times = [];
let fps;
const FPS_DIV = document.getElementById("FPS");

const updateFPS = () => {
    const now = performance.now();

    times.push(now);

    while (times[0] <= now - 1000) {
        times.shift();
    }

    fps = times.length;
};

setInterval(() => {
    FPS_DIV.innerHTML = `FPS: ${fps}`;
}, 500);

export { updateFPS };
