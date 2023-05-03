'use strict';

import { COLOR, TYPE, PIECES } from "./constants.js";

const COLOR_MAP = [
    "WHITE", "BLACK"
];

const TYPE_MAP = [
    "ROOK", "KNIGHT", "BISHOP", "QUEEN", "KING", "PAWN"
];

class Piece {
    #color;
    #type;
    Location;

    constructor(color, type, location) {
        this.#color = color;
        this.#type = type;
        this.Location = location;
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
