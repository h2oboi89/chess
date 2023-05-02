'use strict';

import { SQR_SIZE, PIECE_OFFSET, BOARD_SIZE, COLOR } from "./constants.js";
import { fps } from "./fps.js";

const TURN_DIV = document.getElementById("TURN");
const FPS_DIV = document.getElementById("FPS");

const drawBoard = (ctx, MOVE) => {
    let white = true;
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (white) ctx.fillStyle = "tan";
            else ctx.fillStyle = "brown";
            white = !white;

            ctx.fillRect(j * SQR_SIZE, i * SQR_SIZE, SQR_SIZE, SQR_SIZE);
        }

        white = !white;
    }

    if (MOVE.src.X !== -1 && MOVE.src.Y !== -1) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "blue";
        ctx.fillRect(MOVE.src.X * SQR_SIZE, MOVE.src.Y * SQR_SIZE, SQR_SIZE, SQR_SIZE)
        ctx.globalAlpha = 1.0;
    }
};

const drawPieces = (ctx, board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            var piece = board[i][j];

            if (piece === null) continue;

            ctx.drawImage(piece.Image, i * SQR_SIZE + PIECE_OFFSET, j * SQR_SIZE + PIECE_OFFSET);
        };
    }
};

const drawCaptured = (ctx, captured) => {
    // TODO: draw pieces 8 to a row
};

const drawTurn = (state) => {
    // TODO: do by event of some kind
    let turn;

    switch (state.TURN) {
        case COLOR.WHITE:
            turn = "White to play";
            break;
        case COLOR.BLACK:
            turn = "Black to play";
            break;
    }

    TURN_DIV.innerHTML = turn;
};

const draw = (guiCtx, blackCtx, whiteCtx, state) => {
    drawBoard(guiCtx, state.MOVE);
    drawPieces(guiCtx, state.BOARD);
    drawCaptured(blackCtx, state.CAPTURED.BLACK);
    drawCaptured(whiteCtx, state.CAPTURED.WHITE);
    drawTurn(state);
};

setInterval(() => {
    FPS_DIV.innerHTML = `FPS: ${fps}`;
}, 500);

export { draw };
