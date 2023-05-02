"use strict";

import { BOARD_SIZE, SQR_SIZE } from "./constants.js";
import { Piece, COLOR, TYPE } from "./piece.js";
import { Point } from "./point.js";

let ctx;

const initBoard = () => {
  const BOARD = new Array(BOARD_SIZE);

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

  return BOARD;
};

const initState = () => {
  const STATE = {};

  STATE.BOARD = initBoard();

  STATE.TURN = COLOR.WHITE;

  STATE.MOVE = { src: Point.DEFAULT, dst: Point.DEFAULT };

  STATE.SELECTED = Point.DEFAULT;

  STATE.CAPTURED = { WHITE: [], BLACK: [] };

  // TODO: figure out if moves or entire board or something else
  STATE.HISTORY = [];

  return STATE;
}

const movePiece = (board, move) => {
  board[move.dst.X][move.dst.Y] = board[move.src.X][move.src.Y];
  board[move.src.X][move.src.Y] = null;
}

const checkForMoveDestination = () => {
  if (STATE.SELECTED.equals(STATE.MOVE.src)) {
    // Deselect Piece
    STATE.MOVE.src = Point.DEFAULT;
    STATE.SELECTED = Point.DEFAULT;
    return;
  }
  else {
    // Move Piece
    STATE.MOVE.dst = Point.Copy(STATE.SELECTED);

    // TODO: check if legal move
    movePiece(STATE.BOARD, STATE.MOVE);

    STATE.SELECTED = Point.DEFAULT;
    STATE.MOVE.src = Point.DEFAULT;
    STATE.MOVE.dst = Point.DEFAULT;

    return;
  }
}

const checkForMoveSource = () => {
  if (STATE.BOARD[STATE.SELECTED.X][STATE.SELECTED.Y] !== null) {
    // Select Piece
    STATE.MOVE.src = Point.Copy(STATE.SELECTED);
    STATE.SELECTED = Point.DEFAULT;
  }
  else {
    STATE.MOVE.src = Point.DEFAULT;
  }
};

const detectUserSelect = () => {
  if (STATE.SELECTED.equals(Point.DEFAULT)) { return; }

  if (STATE.MOVE.src.equals(Point.DEFAULT)) {
    checkForMoveSource();
  }
  else {
    checkForMoveDestination();
  }
}

let STATE = initState();

const updateState = () => { detectUserSelect(); };

const setSelected = (x, y) => {
  STATE.SELECTED = new Point(Math.floor(x / SQR_SIZE), Math.floor(y / SQR_SIZE));
}

export { STATE, setSelected, updateState }
