'use strict';

import { SQR_SIZE, PIECE_OFFSET, BOARD_SIZE } from "./constants.js";

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

const draw = (guiCtx, blackCtx, whiteCtx, state) => {
    drawBoard(guiCtx, state.MOVE);
    drawPieces(guiCtx, state.BOARD);
    drawCaptured(blackCtx, state.CAPTURED.BLACK);
    drawCaptured(whiteCtx, state.CAPTURED.WHITE);
};

export { draw };
