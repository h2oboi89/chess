"use strict";

import { SQR_SIZE, BOARD_SIZE } from "./constants.js";
import { updateFPS } from "./fps.js";
import { drawBoard, drawPieces } from "./draw.js";
import { Piece, COLOR, TYPE } from "./piece.js";

const BOARD = new Array(BOARD_SIZE);
const SELECTED = { x: -1, y: -1 };
let MOVE = { src: { x: -1, y: -1 }, dst: { x: -1, y: -1 } };
let ctx;

const initBoard = () => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    BOARD[i] = new Array(BOARD_SIZE);
    for (let j = 0; j < BOARD_SIZE; j++) {
      BOARD[i][j] = null;
    }
  }

  BOARD[0][0] = new Piece(COLOR.BLACK, TYPE.ROOK);
  BOARD[1][0] = new Piece(COLOR.BLACK, TYPE.KNIGHT);
  BOARD[2][0] = new Piece(COLOR.BLACK, TYPE.BISHOP);
  BOARD[3][0] = new Piece(COLOR.BLACK, TYPE.QUEEN);
  BOARD[4][0] = new Piece(COLOR.BLACK, TYPE.KING);
  BOARD[5][0] = new Piece(COLOR.BLACK, TYPE.BISHOP);
  BOARD[6][0] = new Piece(COLOR.BLACK, TYPE.KNIGHT);
  BOARD[7][0] = new Piece(COLOR.BLACK, TYPE.ROOK);

  BOARD[0][1] = new Piece(COLOR.BLACK, TYPE.PAWN);
  BOARD[1][1] = new Piece(COLOR.BLACK, TYPE.PAWN);
  BOARD[2][1] = new Piece(COLOR.BLACK, TYPE.PAWN);
  BOARD[3][1] = new Piece(COLOR.BLACK, TYPE.PAWN);
  BOARD[4][1] = new Piece(COLOR.BLACK, TYPE.PAWN);
  BOARD[5][1] = new Piece(COLOR.BLACK, TYPE.PAWN);
  BOARD[6][1] = new Piece(COLOR.BLACK, TYPE.PAWN);
  BOARD[7][1] = new Piece(COLOR.BLACK, TYPE.PAWN);


  BOARD[0][6] = new Piece(COLOR.WHITE, TYPE.PAWN);
  BOARD[1][6] = new Piece(COLOR.WHITE, TYPE.PAWN);
  BOARD[2][6] = new Piece(COLOR.WHITE, TYPE.PAWN);
  BOARD[3][6] = new Piece(COLOR.WHITE, TYPE.PAWN);
  BOARD[4][6] = new Piece(COLOR.WHITE, TYPE.PAWN);
  BOARD[5][6] = new Piece(COLOR.WHITE, TYPE.PAWN);
  BOARD[6][6] = new Piece(COLOR.WHITE, TYPE.PAWN);
  BOARD[7][6] = new Piece(COLOR.WHITE, TYPE.PAWN);

  BOARD[0][7] = new Piece(COLOR.WHITE, TYPE.ROOK);
  BOARD[1][7] = new Piece(COLOR.WHITE, TYPE.KNIGHT);
  BOARD[2][7] = new Piece(COLOR.WHITE, TYPE.BISHOP);
  BOARD[3][7] = new Piece(COLOR.WHITE, TYPE.QUEEN);
  BOARD[4][7] = new Piece(COLOR.WHITE, TYPE.KING);
  BOARD[5][7] = new Piece(COLOR.WHITE, TYPE.BISHOP);
  BOARD[6][7] = new Piece(COLOR.WHITE, TYPE.KNIGHT);
  BOARD[7][7] = new Piece(COLOR.WHITE, TYPE.ROOK);
};

const draw = () => {
  drawBoard(ctx, MOVE);
  drawPieces(ctx, BOARD);
};

const detectUserSelect = () => {
  if (SELECTED.x !== -1 && SELECTED.y !== -1) {
    if (MOVE.src.x !== -1 && MOVE.src.y !== -1) {
      if (SELECTED.x === MOVE.src.x && SELECTED.y === MOVE.src.y) {
        // Deselect Piece
        MOVE.src = { x: -1, y: -1 };

        SELECTED.x = -1;
        SELECTED.y = -1;
        return;
      }
      else {
        // Move Piece
        MOVE.dst = { x: SELECTED.x, y: SELECTED.y };

        // TODO: check if legal move
        BOARD[MOVE.dst.x][MOVE.dst.y] = BOARD[MOVE.src.x][MOVE.src.y];
        BOARD[MOVE.src.x][MOVE.src.y] = null;

        SELECTED.x = -1;
        SELECTED.y = -1;

        MOVE.src = { x: -1, y: -1 };
        MOVE.dst = { x: -1, y: -1 };

        return;
      }
    }

    if (BOARD[SELECTED.x][SELECTED.y] !== null) {
      // Select Piece
      MOVE.src = { x: SELECTED.x, y: SELECTED.y };
      SELECTED.x = -1;
      SELECTED.y = -1;
    }
    else {
      MOVE.src = { x: -1, y: -1 };
    }
  }
}

const update = () => {
  updateFPS();
  detectUserSelect();
};

const mainLoop = () => {
  update();

  draw();

  requestAnimationFrame(mainLoop);
}

const onClick = (e) => {
  let cx = e.offsetX;
  let cy = e.offsetY;

  SELECTED.x = Math.floor(cx / SQR_SIZE);
  SELECTED.y = Math.floor(cy / SQR_SIZE);

  console.log(`Canvas ( ${cx}, ${cy} ); Board ( ${SELECTED} )`);
};

const onLoad = () => {
  const canvas = document.getElementById("GUI");
  ctx = canvas.getContext("2d");

  canvas.addEventListener("click", onClick);

  initBoard();

  requestAnimationFrame(mainLoop);
};

export { onLoad }

