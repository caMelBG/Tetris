var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObjects;
(function (GameObjects) {
    GameObjects.FigureCount = 7;
    var Figure = (function () {
        function Figure(matrix, position) {
            this.matrix = matrix;
            this.position = position;
            this.size = this.matrix.length;
        }
        Figure.prototype.rotate = function () {
            var row = 0;
            var col = this.size - 1;
            var newMatrix;
            newMatrix = [];
            for (var i = 0; i < this.size; i++) {
                newMatrix[i] = [];
                for (var j = 0; j < this.size; j++) {
                    if (row > 0) {
                        newMatrix[i][j] = this.matrix[row - j][i];
                    }
                    else if (col > 0) {
                        newMatrix[i][j] = this.matrix[j][col - i];
                    }
                }
            }
            for (var i = 0; i < this.matrix.length; i++) {
                for (var j = 0; j < this.matrix.length; j++) {
                    this.matrix[i][j] = newMatrix[i][j];
                }
            }
        };
        return Figure;
    }());
    GameObjects.Figure = Figure;
    var Board = (function () {
        function Board() {
            this.width = 15;
            this.height = 25;
            this.matrix = [];
            for (var i = 0; i < this.height; i++) {
                this.matrix[i] = [];
                for (var j = 0; j < this.width; j++) {
                    this.matrix[i][j] = 0;
                }
            }
        }
        return Board;
    }());
    GameObjects.Board = Board;
    var Position = (function () {
        function Position(row, col) {
            this.row = row;
            this.col = col;
        }
        return Position;
    }());
    GameObjects.Position = Position;
    var OBlock = (function (_super) {
        __extends(OBlock, _super);
        function OBlock(position) {
            _super.call(this, [
                [1, 1],
                [1, 1],
            ], position);
        }
        return OBlock;
    }(Figure));
    GameObjects.OBlock = OBlock;
    var IBlock = (function (_super) {
        __extends(IBlock, _super);
        function IBlock(position) {
            _super.call(this, [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ], position);
        }
        return IBlock;
    }(Figure));
    GameObjects.IBlock = IBlock;
    var LBlock = (function (_super) {
        __extends(LBlock, _super);
        function LBlock(position) {
            _super.call(this, [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ], position);
        }
        return LBlock;
    }(Figure));
    GameObjects.LBlock = LBlock;
    var JBlock = (function (_super) {
        __extends(JBlock, _super);
        function JBlock(position) {
            _super.call(this, [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ], position);
        }
        return JBlock;
    }(Figure));
    GameObjects.JBlock = JBlock;
    var SBlock = (function (_super) {
        __extends(SBlock, _super);
        function SBlock(position) {
            _super.call(this, [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ], position);
        }
        return SBlock;
    }(Figure));
    GameObjects.SBlock = SBlock;
    var ZBlock = (function (_super) {
        __extends(ZBlock, _super);
        function ZBlock(position) {
            _super.call(this, [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ], position);
        }
        return ZBlock;
    }(Figure));
    GameObjects.ZBlock = ZBlock;
    var TBlock = (function (_super) {
        __extends(TBlock, _super);
        function TBlock(position) {
            _super.call(this, [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0],
            ], position);
        }
        return TBlock;
    }(Figure));
    GameObjects.TBlock = TBlock;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GameObjects.js.map