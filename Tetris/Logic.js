var Logic;
(function (Logic) {
    var StartRow = -1;
    var StartCol = 6;
    var MovementSpeed = 0;
    var Engine = (function () {
        function Engine(board, tableHelper) {
            this.board = board;
            this.tableHelper = tableHelper;
            this.figure = this.getFigure();
        }
        Engine.prototype.keyPressed = function (keyCode) {
            this.deleteLastFigurePosition();
            switch (keyCode) {
                case 37:
                    this.moveToLeft();
                    break;
                case 38:
                    this.rotateFigure();
                    break;
                case 39:
                    this.moveToRight();
                    break;
                case 40:
                    this.moveToDown();
                    break;
            }
            this.updateNewFigurePosition();
        };
        Engine.prototype.rotateFigure = function () {
            if (this.figure.position.col < 0) {
                this.figure.position.col++;
            }
            else if (this.figure.position.col + this.figure.matrix.length > this.board.width) {
                this.figure.position.col = this.board.width - this.figure.matrix.length;
            }
            this.figure.rotate();
        };
        Engine.prototype.moveToDown = function () {
            if (this.canMove(1, 0)) {
                this.figure.position.row++;
            }
        };
        Engine.prototype.moveToLeft = function () {
            if (this.canMove(0, -1)) {
                this.figure.position.col--;
            }
        };
        Engine.prototype.moveToRight = function () {
            if (this.canMove(0, 1)) {
                this.figure.position.col++;
            }
        };
        Engine.prototype.gameLoop = function () {
            this.deleteLastFigurePosition();
            if (!this.canMove(1, 0)) {
                this.updateNewFigurePosition();
                this.checkForFullRow();
                this.figure = this.getFigure();
            }
            else {
                this.figure.position.row++;
                this.updateNewFigurePosition();
            }
        };
        Engine.prototype.canMove = function (row, col) {
            if (this.figure.position.row < 0) {
                if (row == 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            row += this.figure.position.row;
            col += this.figure.position.col;
            for (var i = 0; i < this.figure.size; i++) {
                for (var j = 0; j < this.figure.size; j++) {
                    if (this.figure.matrix[i][j] == 1) {
                        if (col + j < 0 || col + j >= this.board.width || row + i >= this.board.height) {
                            return false;
                        }
                        else if (this.figure.matrix[i][j] == 1 && this.board.matrix[i + row][j + col] == 1) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        Engine.prototype.checkForFullRow = function () {
            var isFull = true;
            for (var i = this.board.height - 1; i >= 0; i--) {
                for (var j = this.board.width - 1; j >= 0; j--) {
                    if (this.board.matrix[i][j] == 0) {
                        isFull = false;
                        break;
                    }
                }
                if (isFull) {
                    this.removeRow(i);
                    i++;
                }
                else {
                    isFull = true;
                }
            }
        };
        Engine.prototype.removeRow = function (row) {
            while (row - 1 >= 0 && this.board.matrix[row].indexOf(1) != -1) {
                this.board.matrix[row] = this.board.matrix[row - 1];
                row--;
            }
            for (var i = 0; i < this.board.height; i++) {
                for (var j = 0; j < this.board.width; j++) {
                    if (this.board.matrix[i][j] == 1) {
                        this.tableHelper.setCellAsUsed(i, j);
                    }
                    else {
                        this.tableHelper.setCellAsFree(i, j);
                    }
                }
            }
        };
        Engine.prototype.deleteLastFigurePosition = function () {
            for (var i = 0; i < this.figure.size; i++) {
                for (var j = 0; j < this.figure.size; j++) {
                    var row = this.figure.position.row + i;
                    var col = this.figure.position.col + j;
                    if (this.figure.matrix[i][j] == 1) {
                        if (col >= 0 && col < this.board.width && row >= 0 && row < this.board.height) {
                            this.board.matrix[row][col] = 0;
                            this.tableHelper.setCellAsFree(row, col);
                        }
                    }
                }
            }
        };
        Engine.prototype.updateNewFigurePosition = function () {
            for (var i = 0; i < this.figure.size; i++) {
                for (var j = 0; j < this.figure.size; j++) {
                    var row = this.figure.position.row + i;
                    var col = this.figure.position.col + j;
                    if (this.figure.matrix[i][j] == 1) {
                        if (col >= 0 && col < this.board.width && row >= 0 && row < this.board.height) {
                            this.board.matrix[row][col] = this.figure.matrix[i][j];
                            this.tableHelper.setCellAsUsed(row, col);
                        }
                    }
                }
            }
        };
        Engine.prototype.getFigure = function () {
            var position = new GameObjects.Position(StartRow, StartCol);
            var randNum = this.getRandomNumber();
            switch (randNum) {
                case 0: return new GameObjects.OBlock(position);
                case 1: return new GameObjects.IBlock(position);
                case 2: return new GameObjects.LBlock(position);
                case 3: return new GameObjects.JBlock(position);
                case 4: return new GameObjects.TBlock(position);
                case 5: return new GameObjects.SBlock(position);
                case 6: return new GameObjects.ZBlock(position);
            }
        };
        Engine.prototype.getRandomNumber = function () {
            return Math.floor((Math.random() * GameObjects.FigureCount));
        };
        return Engine;
    }());
    Logic.Engine = Engine;
})(Logic || (Logic = {}));
//# sourceMappingURL=Logic.js.map