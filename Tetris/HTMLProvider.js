var HTMLProvider;
(function (HTMLProvider) {
    var TableHelper = (function () {
        function TableHelper() {
        }
        TableHelper.prototype.setCellAsUsed = function (row, col) {
            var id = row + ", " + col;
            var cell = document.getElementById(id);
            cell.setAttribute("class", "usedCell");
        };
        TableHelper.prototype.setCellAsFree = function (row, col) {
            var id = row + ", " + col;
            var cell = document.getElementById(id);
            cell.setAttribute("class", "freeCell");
        };
        TableHelper.prototype.initTable = function () {
            var body = document.getElementsByTagName('body')[0];
            var table = document.createElement('table');
            table.setAttribute("align", "center");
            for (var i = 0; i < 25; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < 15; j++) {
                    var cell = document.createElement('td');
                    cell.setAttribute("class", "freeCell");
                    cell.setAttribute("id", i + ", " + j);
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
            body.appendChild(table);
        };
        return TableHelper;
    }());
    HTMLProvider.TableHelper = TableHelper;
})(HTMLProvider || (HTMLProvider = {}));
//# sourceMappingURL=HTMLProvider.js.map