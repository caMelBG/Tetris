namespace GameObjects {
    export const FigureCount = 7;

    export class Figure {
        public matrix: number[][];
        public position: Position;
        public size: number;
        constructor(matrix: number[][], position: Position) {
            this.matrix = matrix;
            this.position = position;
            this.size = this.matrix.length;
        }

        public rotate() {
            let row: number = 0;
            let col: number = this.size - 1;
            let newMatrix: number[][];
            newMatrix = [];
            for (let i = 0; i < this.size; i++) {
                newMatrix[i] = [];
                for (let j = 0; j < this.size; j++) {
                    if (row > 0) {
                        newMatrix[i][j] = this.matrix[row - j][i];
                    }
                    else if (col > 0) {
                        newMatrix[i][j] = this.matrix[j][col - i];
                    }
                }
            }

            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix.length; j++) {
                    this.matrix[i][j] = newMatrix[i][j];
                }
            }
        }
    }

    export class Board {
        public width: number = 15;
        public height: number = 25;
        public matrix: number[][];
        constructor() {
            this.matrix = [];
            for (let i = 0; i < this.height; i++) {
                this.matrix[i] = [];
                for (let j = 0; j < this.width; j++) {
                    this.matrix[i][j] = 0;
                }
            }
        }
    }

    export class Position {
        public row: number;
        public col: number;
        constructor(row: number, col: number) {
            this.row = row;
            this.col = col;
        }
    }

    export class OBlock extends Figure {
        constructor(position: Position) {
            super([
                [1, 1],
                [1, 1],
            ], position);
        }
    }

    export class IBlock extends Figure {
        constructor(position: Position) {
            super([
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ], position);
        }
    }

    export class LBlock extends Figure {
        constructor(position: Position) {
            super([
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ], position);
        }
    }

    export class JBlock extends Figure {
        constructor(position: Position) {
            super([
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ], position);
        }
    }

    export class SBlock extends Figure {
        constructor(position: Position) {
            super([
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ], position);
        }
    }

    export class ZBlock extends Figure {
        constructor(position: Position) {
            super([
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ], position);
        }
    }

    export class TBlock extends Figure {
        constructor(position: Position) {
            super([
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0],
            ], position);
        }
    }
}