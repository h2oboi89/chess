"use strict";

import { BOARD_SIZE, SQR_SIZE, CAPTURE_OFFSET } from "./constants.js";
import { Piece, COLOR, TYPE } from "./piece.js";
import { Point } from "./point.js";

let ctx;

const initPieces = () => {
  const pieces = new Array();
  
  pieces.push(new Piece(COLOR.BLACK, TYPE.ROOK, new Point(0, 0)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.KNIGHT, new Point(1, 0)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.BISHOP, new Point(2, 0)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.QUEEN, new Point(3, 0)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.KING, new Point(4, 0)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.BISHOP, new Point(5, 0)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.KNIGHT, new Point(6, 0)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.ROOK, new Point(7, 0)));

  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(0, 1)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(1, 1)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(2, 1)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(3, 1)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(4, 1)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(5, 1)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(6, 1)));
  pieces.push(new Piece(COLOR.BLACK, TYPE.PAWN, new Point(7, 1)));


  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(0, 6)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(1, 6)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(2, 6)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(3, 6)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(4, 6)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(5, 6)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(6, 6)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.PAWN, new Point(7, 6)));

  pieces.push(new Piece(COLOR.WHITE, TYPE.ROOK, new Point(0, 7)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.KNIGHT, new Point(1, 7)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.BISHOP, new Point(2, 7)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.QUEEN, new Point(3, 7)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.KING, new Point(4, 7)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.BISHOP, new Point(5, 7)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.KNIGHT, new Point(6, 7)));
  pieces.push(new Piece(COLOR.WHITE, TYPE.ROOK, new Point(7, 7)));

  return pieces;
};

const initState = () => {
  const state = new EventTarget();

  state.Pieces = initPieces();

  state.Turn = COLOR.WHITE;

  state.Move = { src: Point.DEFAULT, dst: Point.DEFAULT };

  state.Selected = Point.DEFAULT;

  state.Captured = { White: [], Black: [] };

  // TODO: figure out if moves or entire board or something else
  state.History = [];

  return state;
}

const findPiece = (pieces, location) => {
  for (let p of pieces) {
    if (p.Location.equals(location)) {
      return p;
    }
  }

  return null;
}

const movePiece = (pieces, move) => {
  const moving = findPiece(pieces, move.src);
  const captured = findPiece(pieces, move.dst);

  if (captured !== null) {
    pieces.splice(pieces.indexOf(captured), 1);
    captured.Location = null;

    if (state.Turn === COLOR.WHITE) {
      state.Captured.White.push(captured);
    }
    else {
      state.Captured.Black.push(captured);
    }
  }

  moving.Location = Point.Copy(move.dst);
}

const changeTurn = () => {
  if (state.Turn === COLOR.WHITE) {
    state.Turn = COLOR.BLACK;
  }
  else {
    state.Turn = COLOR.WHITE;
  }

  state.dispatchEvent(new CustomEvent("turn", { detail: state.Turn }));
}

const checkForMoveDestination = () => {
  if (state.Selected.equals(state.Move.src)) {
    // Deselect Piece
    state.Move.src = Point.DEFAULT;
    state.Selected = Point.DEFAULT;
    return;
  }
  else {
    // Move Piece
    state.Move.dst = Point.Copy(state.Selected);

    // TODO: check if legal move
    movePiece(state.Pieces, state.Move);

    changeTurn();
    state.Selected = Point.DEFAULT;
    state.Move.src = Point.DEFAULT;
    state.Move.dst = Point.DEFAULT;

    return;
  }
}

const checkForMoveSource = () => {
  const piece = findPiece(state.Pieces, state.Selected);

  if (piece !== null) {
    if (piece.Color !== state.Turn) {
      state.Selected = Point.DEFAULT;
      return;
    }

    // Select Piece
    state.Move.src = Point.Copy(state.Selected);
    state.Selected = Point.DEFAULT;
  }
  else {
    state.Move.src = Point.DEFAULT;
  }
};

const detectUserSelect = () => {
  if (state.Selected.equals(Point.DEFAULT)) { return; }

  if (state.Move.src.equals(Point.DEFAULT)) {
    checkForMoveSource();
  }
  else {
    checkForMoveDestination();
  }
}

let state = initState();

const updateState = () => { detectUserSelect(); };

const setSelected = (x, y) => {
  state.Selected = new Point(Math.floor(x / SQR_SIZE), Math.floor((y - CAPTURE_OFFSET) / SQR_SIZE));
}

export { state, setSelected, updateState }
