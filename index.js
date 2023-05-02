'use strict';

import { STATE, setSelected, updateState } from './src/main.js';
import { updateFPS } from "./src/fps.js";
import { draw } from "./src/draw.js";

let guiCtx;
let blackCtx;
let whiteCtx;

const mainLoop = () => {
    updateFPS();

    updateState();

    draw(guiCtx, blackCtx, whiteCtx, STATE);

    requestAnimationFrame(mainLoop);
}

const onClick = (e) => { setSelected(e.offsetX, e.offsetY); };

window.onload = () => {
    const guiCanvas = document.getElementById("GUI");
    guiCanvas.addEventListener("click", onClick);
    guiCtx = guiCanvas.getContext("2d");

    const blackCanvas = document.getElementById("black_captured");
    blackCtx = blackCanvas.getContext("2d");

    const whiteCanvas = document.getElementById("white_captured");
    whiteCtx = whiteCanvas.getContext("2d");

    requestAnimationFrame(mainLoop);
};
