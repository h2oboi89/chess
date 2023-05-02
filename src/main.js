"use strict";

import { SQR_SIZE, PIECE_OFFSET, BOARD_SIZE, PIECES } from "./constants.js";
import { updateFPS } from "./fps.js";

const board = new Array(BOARD_SIZE);

const SELECTED = { x: -1, y: -1 };

let MOVE = { src : { x: -1, y: -1 }, dst : { x: -1, y : -1 } };
let ctx;

const drawBoard = () => {
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

  if (MOVE.src.x !== -1 && MOVE.src.y !== -1) {
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "blue";
    ctx.fillRect(MOVE.src.x * SQR_SIZE, MOVE.src.y * SQR_SIZE, SQR_SIZE, SQR_SIZE)
    ctx.globalAlpha = 1.0;
  }
};

const initBoard = () => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = new Array(BOARD_SIZE);
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = null;
    }
  }

  board[0][0] = PIECES.black.rook;
  board[1][0] = PIECES.black.knight;
  board[2][0] = PIECES.black.bishop;
  board[3][0] = PIECES.black.queen;
  board[4][0] = PIECES.black.king;
  board[5][0] = PIECES.black.bishop;
  board[6][0] = PIECES.black.knight;
  board[7][0] = PIECES.black.rook;
  board[0][1] = PIECES.black.pawn;
  board[1][1] = PIECES.black.pawn;
  board[2][1] = PIECES.black.pawn;
  board[3][1] = PIECES.black.pawn;
  board[4][1] = PIECES.black.pawn;
  board[5][1] = PIECES.black.pawn;
  board[6][1] = PIECES.black.pawn;
  board[7][1] = PIECES.black.pawn;
  
  board[0][6] = PIECES.white.pawn;
  board[1][6] = PIECES.white.pawn;
  board[2][6] = PIECES.white.pawn;
  board[3][6] = PIECES.white.pawn;
  board[4][6] = PIECES.white.pawn;
  board[5][6] = PIECES.white.pawn;
  board[6][6] = PIECES.white.pawn;
  board[7][6] = PIECES.white.pawn;
  board[0][7] = PIECES.white.rook;
  board[1][7] = PIECES.white.knight;
  board[2][7] = PIECES.white.bishop;
  board[3][7] = PIECES.white.queen;
  board[4][7] = PIECES.white.king;
  board[5][7] = PIECES.white.bishop;
  board[6][7] = PIECES.white.knight;
  board[7][7] = PIECES.white.rook;
};

const drawPieces = () => {
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) continue;

      ctx.drawImage(board[i][j], i * SQR_SIZE + PIECE_OFFSET, j * SQR_SIZE + PIECE_OFFSET);
    };
  }
};

const draw = () => {
  drawBoard();
  drawPieces();
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
        MOVE.dst = { x: SELECTED.x, y: SELECTED.y};

        // TODO: check if legal move
        board[MOVE.dst.x][MOVE.dst.y] = board[MOVE.src.x][MOVE.src.y];
        board[MOVE.src.x][MOVE.src.y] = null;
  
        SELECTED.x = -1;
        SELECTED.y = -1;
  
        MOVE.src = { x: -1, y: -1 };
        MOVE.dst = { x: -1, y: -1 };

        return;
      }
    }

    if (board[SELECTED.x][SELECTED.y] !== null) {
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

