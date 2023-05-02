'use strict';

const pieces = { white: {}, black: {} };

pieces.white.king = document.getElementById("wkg");
pieces.white.queen = document.getElementById("wqn");
pieces.white.bishop = document.getElementById("wbp");
pieces.white.knight = document.getElementById("wkt");
pieces.white.rook = document.getElementById("wrk");
pieces.white.pawn = document.getElementById("wpn");

pieces.black.king = document.getElementById("bkg");
pieces.black.queen = document.getElementById("bqn");
pieces.black.bishop = document.getElementById("bbp");
pieces.black.knight = document.getElementById("bkt");
pieces.black.rook = document.getElementById("brk");
pieces.black.pawn = document.getElementById("bpn");

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

export const SQR_SIZE = 55;
export const PIECE_OFFSET = 5;
export const BOARD_SIZE = 8;
export const PIECES = pieces;
export { COLOR, TYPE };
