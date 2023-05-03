'use strict';

import { state, setSelected, updateState } from './src/main.js';
import { updateFPS } from "./src/fps.js";
import { draw, drawTurn } from "./src/draw.js";

let ctx;

const mainLoop = () => {
    updateFPS();

    updateState();

    draw(ctx, state);

    requestAnimationFrame(mainLoop);
}

const onClick = (e) => { setSelected(e.offsetX, e.offsetY); };

window.onload = () => {
    const guiCanvas = document.getElementById("GUI");
    guiCanvas.addEventListener("click", onClick);
    ctx = guiCanvas.getContext("2d");

    state.addEventListener("turn", (turn) => drawTurn(turn));

    drawTurn({ detail: state.Turn });

    requestAnimationFrame(mainLoop);
};
