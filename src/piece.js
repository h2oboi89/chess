'use strict';

import { PIECES } from "./constants.js";

const COLOR = {
    WHITE: 0,
    BLACK: 1
};

const COLOR_MAP = [
    "WHITE", "BLACK"
];

const TYPE = {
    ROOK: 0,
    KNIGHT: 1,
    BISHOP: 2,
    QUEEN: 3,
    KING: 4,
    PAWN: 5
};

const TYPE_MAP = [
    "ROOK", "KNIGHT", "BISHOP", "QUEEN", "KING", "PAWN"
];

class Piece {
    #color;
    #type;

    constructor(color, type) {
        this.#color = color;
        this.#type = type;
    }

    get Color() { return this.#color; }
    get Type() { return this.#type; }

    get Image() {
        let side = undefined;

        switch (this.#color) {
            case COLOR.WHITE:
                side = PIECES.white;
                break;
            case COLOR.BLACK:
                side = PIECES.black;
                break;
            default:
                console.error(`Invalid side ${Color}`);
                return undefined;
        }

        switch (this.#type) {
            case TYPE.ROOK: return side.rook;
            case TYPE.KNIGHT: return side.knight;
            case TYPE.BISHOP: return side.bishop;
            case TYPE.QUEEN: return side.queen;
            case TYPE.KING: return side.king;
            case TYPE.PAWN: return side.pawn;
            default:
                console.error(`Invalid type ${Type}`);
                return undefined;
        }
    }

    toString() { return `${COLOR_MAP[Color]} ${TYPE_MAP[Type]}` }
}

export { Piece, COLOR, TYPE };
