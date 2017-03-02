namespace Logic {
    const StartRow = -1;
    const StartCol = 6;
    const MovementSpeed = 0;
    export class Engine {
        private board: GameObjects.Board;
        private figure: GameObjects.Figure;
        private tableHelper: HTMLProvider.TableHelper;
        constructor(board: GameObjects.Board, tableHelper: HTMLProvider.TableHelper) {
            this.board = board;
            this.tableHelper = tableHelper;
            this.figure = this.getFigure();
        }

        public keyPressed(keyCode: number) {
            this.deleteLastFigurePosition();
            switch (keyCode) {
                case 37: this.moveToLeft(); break;
                case 38: this.rotateFigure(); break;
                case 39: this.moveToRight(); break;
                case 40: this.moveToDown(); break;
            }

            this.updateNewFigurePosition();
        }

        private rotateFigure() {
            if (this.figure.position.col < 0) {
                this.figure.position.col++;
            } else if (this.figure.position.col + this.figure.matrix.length > this.board.width) {
                this.figure.position.col = this.board.width - this.figure.matrix.length;
            }

            this.figure.rotate();
        }

        private moveToDown() {
            if (this.canMove(1, 0)) {
                this.figure.position.row++;
            }
        }

        private moveToLeft() {
            if (this.canMove(0, -1)) {
                this.figure.position.col--;
            }
        }

        private moveToRight() {
            if (this.canMove(0, 1)) {
                this.figure.position.col++;
            }
        }

        private gameLoop() {
            this.deleteLastFigurePosition();
            if (!this.canMove(1, 0)) {
                this.updateNewFigurePosition();
                this.checkForFullRow();
                this.figure = this.getFigure();
            } else {
                this.figure.position.row++;
                this.updateNewFigurePosition();
            }
        }

        private canMove(row: number, col: number): boolean {
            if (this.figure.position.row < 0) {
                if (row == 0) {
                    return false;
                } else {
                    return true;
                }
            }

            row += this.figure.position.row;
            col += this.figure.position.col;
            for (let i = 0; i < this.figure.size; i++) {
                for (let j = 0; j < this.figure.size; j++) {
                    if (this.figure.matrix[i][j] == 1) {
                        if (col + j < 0 || col + j >= this.board.width || row + i >= this.board.height) {
                            return false;
                        } else if (this.figure.matrix[i][j] == 1 && this.board.matrix[i + row][j + col] == 1) {
                            return false;
                        }
                    }
                }
            }

            return true;
        }

        private checkForFullRow() {
            let isFull = true;
            for (let i = this.board.height - 1; i >= 0; i--) {
                for (let j = this.board.width - 1; j >= 0; j--) {
                    if (this.board.matrix[i][j] == 0) {
                        isFull = false;
                        break;
                    }
                }

                if (isFull) {
                    this.removeRow(i);
                    i++;
                } else {
                    isFull = true;
                }
            }
        }

        private removeRow(row: number) {
            while (row - 1 >= 0 && this.board.matrix[row].indexOf(1) != - 1) {
                this.board.matrix[row] = this.board.matrix[row - 1];
                row--;
            }

            for (let i = 0; i < this.board.height; i++) {
                for (let j = 0; j < this.board.width; j++) {
                    if (this.board.matrix[i][j] == 1) {
                        this.tableHelper.setCellAsUsed(i, j);
                    } else {
                        this.tableHelper.setCellAsFree(i, j);
                    }
                }
            }
        }

        private deleteLastFigurePosition() {
            for (let i = 0; i < this.figure.size; i++) {
                for (let j = 0; j < this.figure.size; j++) {
                    let row = this.figure.position.row + i;
                    let col = this.figure.position.col + j;
                    if (this.figure.matrix[i][j] == 1) {
                        if (col >= 0 && col < this.board.width && row >= 0 && row < this.board.height) {
                            this.board.matrix[row][col] = 0;
                            this.tableHelper.setCellAsFree(row, col);
                        }
                    }
                }
            }
        }

        private updateNewFigurePosition() {
            for (let i = 0; i < this.figure.size; i++) {
                for (let j = 0; j < this.figure.size; j++) {
                    let row = this.figure.position.row + i;
                    let col = this.figure.position.col + j;
                    if (this.figure.matrix[i][j] == 1) {
                        if (col >= 0 && col < this.board.width && row >= 0 && row < this.board.height) {
                            this.board.matrix[row][col] = this.figure.matrix[i][j];
                            this.tableHelper.setCellAsUsed(row, col);
                        }
                    }
                }
            }
        }

        private getFigure(): GameObjects.Figure {
            let position = new GameObjects.Position(StartRow, StartCol);
            let randNum = this.getRandomNumber();
            switch (randNum) {
                case 0: return new GameObjects.OBlock(position);
                case 1: return new GameObjects.IBlock(position);
                case 2: return new GameObjects.LBlock(position);
                case 3: return new GameObjects.JBlock(position);
                case 4: return new GameObjects.TBlock(position);
                case 5: return new GameObjects.SBlock(position);
                case 6: return new GameObjects.ZBlock(position);
            }
        }

        private getRandomNumber(): number {
            return Math.floor((Math.random() * GameObjects.FigureCount));
        }
    }
}
