'use strict';

class Point {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    static DEFAULT = new Point(-1, -1);

    static Copy(point) { return new Point(point.X, point.Y); }

    get X() { return this.#x; }
    get Y() { return this.#y; }

    toString() { return `( ${this.#x}, ${this.#y} )`; }

    equals(other) {
        if (other == undefined) return false;

        return other.X === this.#x &&
            other.Y === this.#y;
    }
}

export { Point };
