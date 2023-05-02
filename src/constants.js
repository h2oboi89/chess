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

export const SQR_SIZE = 55;
export const PIECE_OFFSET = 5;
export const BOARD_SIZE = 8;
export const PIECES = pieces;
