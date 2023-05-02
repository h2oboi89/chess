'use strict';

const times = [];
let fps;

const updateFPS = () => {
    const now = performance.now();

    times.push(now);

    while (times[0] <= now - 1000) {
        times.shift();
    }

    fps = times.length;
};

export { updateFPS, fps };
