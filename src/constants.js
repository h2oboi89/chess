'use strict';

const pieces = { white: {}, black: {} };

pieces.white.king = new Image();
pieces.white.king.src = "../Pieces/White/King.svg";
pieces.white.queen = new Image();
pieces.white.queen.src = "../Pieces/White/Queen.svg";
pieces.white.bishop = new Image();
pieces.white.bishop.src = "../Pieces/White/Bishop.svg";
pieces.white.knight = new Image();
pieces.white.knight.src = "../Pieces/White/Knight.svg";
pieces.white.rook = new Image();
pieces.white.rook.src = "../Pieces/White/Rook.svg";
pieces.white.pawn = new Image();
pieces.white.pawn.src = "../Pieces/White/Pawn.svg";

pieces.black.king = new Image();
pieces.black.king.src = "../Pieces/Black/King.svg";
pieces.black.queen = new Image();
pieces.black.queen.src = "../Pieces/Black/Queen.svg";
pieces.black.bishop = new Image();
pieces.black.bishop.src = "../Pieces/Black/Bishop.svg";
pieces.black.knight = new Image();
pieces.black.knight.src = "../Pieces/Black/Knight.svg";
pieces.black.rook = new Image();
pieces.black.rook.src = "../Pieces/Black/Rook.svg";
pieces.black.pawn = new Image();
pieces.black.pawn.src = "../Pieces/Black/Pawn.svg";

const COLOR = {
    WHITE: 0,
    BLACK: 1
};

const TYPE = {
    ROOK: 0,
    KNIGHT: 1,
    BISHOP: 2,
    QUEEN: 3,
    KING: 4,
    PAWN: 5
};

export const CAPTURE_OFFSET = 110;
export const SQR_SIZE = 55;
export const PIECE_OFFSET = 5;
export const BOARD_SIZE = 8;
export const PIECES = pieces;
export { COLOR, TYPE };
