'use strict';

import { SQR_SIZE, PIECE_OFFSET, BOARD_SIZE, COLOR, CAPTURE_OFFSET } from "./constants.js";
import { fps } from "./fps.js";

const TURN_DIV = document.getElementById("TURN");
const FPS_DIV = document.getElementById("FPS");

const drawBoard = (ctx, move) => {
    let white = true;
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            if (white) ctx.fillStyle = "tan";
            else ctx.fillStyle = "brown";
            white = !white;

            ctx.fillRect(y * SQR_SIZE, x * SQR_SIZE + CAPTURE_OFFSET, SQR_SIZE, SQR_SIZE);
        }

        white = !white;
    }

    if (move.src.X !== -1 && move.src.Y !== -1) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "blue";
        ctx.fillRect(move.src.X * SQR_SIZE, move.src.Y * SQR_SIZE + CAPTURE_OFFSET, SQR_SIZE, SQR_SIZE)
        ctx.globalAlpha = 1.0;
    }
};

const drawCaptured = (ctx, side, captured) => {
    let offsetY = 0;

    if (side === COLOR.WHITE) {
        offsetY = CAPTURE_OFFSET + (BOARD_SIZE * SQR_SIZE);
    }

    let x = 0;
    let y = 0;
    for (let piece of captured) {
        if (x === 8) {
            y++; x = 0;
        }

        ctx.drawImage(piece.Image, x * SQR_SIZE + PIECE_OFFSET, y * SQR_SIZE + PIECE_OFFSET + offsetY);
        x++;
    }
};

const drawPieces = (ctx, state) => {
    for (let piece of state.Pieces) {
        ctx.drawImage(piece.Image, piece.Location.X * SQR_SIZE + PIECE_OFFSET, piece.Location.Y * SQR_SIZE + PIECE_OFFSET + CAPTURE_OFFSET);
    }
};

const drawTurn = (e) => {
    let turnText;

    switch (e.detail) {
        case COLOR.WHITE:
            turnText = "White to play";
            break;
        case COLOR.BLACK:
            turnText = "Black to play";
            break;
    }

    TURN_DIV.innerHTML = turnText;
};

const draw = (ctx, state) => {
    drawCaptured(ctx, COLOR.BLACK, state.Captured.Black);
    drawBoard(ctx, state.Move);
    drawPieces(ctx, state);
    drawCaptured(ctx, COLOR.WHITE, state.Captured.White);
};

setInterval(() => {
    FPS_DIV.innerHTML = `FPS: ${fps}`;
}, 500);

export { draw, drawTurn };
