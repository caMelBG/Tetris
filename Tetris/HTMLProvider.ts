namespace HTMLProvider {
    export class TableHelper {
        public setCellAsUsed(row: number, col: number) {
            let id = row + ", " + col;
            var cell = document.getElementById(id);
            cell.setAttribute("class", "usedCell");
        }

        public setCellAsFree(row: number, col: number) {
            let id = row + ", " + col;
            var cell = document.getElementById(id);
            cell.setAttribute("class", "freeCell");
        }

        public initTable() {
            var body = document.getElementsByTagName('body')[0];
            var table = document.createElement('table');
            table.setAttribute("align", "center");
            for (let i = 0; i < 25; i++) {
                var row = document.createElement('tr');
                for (let j = 0; j < 15; j++) {
                    var cell = document.createElement('td');
                    cell.setAttribute("class", "freeCell");
                    cell.setAttribute("id", i + ", " + j);
                    row.appendChild(cell);
                }

                table.appendChild(row);
            }

            body.appendChild(table);
        }
    }
}
