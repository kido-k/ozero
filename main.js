
const dirAll = [[0, 1], [1, 0], [0, -1], [-1, 0],
[-1, -1], [-1, 1], [1, 1], [1, -1]];

let vm = new Vue({
    el: '#app',
    data: {
        wb: 1,
        bord: [
            [, , , , , , , ,],
            [, 9, 9, 9, 9, 9, 9, 9, 9],
            [, 9, 9, 9, 9, 9, 9, 9, 9],
            [, 9, 9, 9, 9, 9, 9, 9, 9],
            [, 9, 9, 9, 0, 1, 9, 9, 9],
            [, 9, 9, 9, 1, 0, 9, 9, 9],
            [, 9, 9, 9, 9, 9, 9, 9, 9],
            [, 9, 9, 9, 9, 9, 9, 9, 9],
            [, 9, 9, 9, 9, 9, 9, 9, 9],
        ],
    },
    computed: {
        w: function () {
            return (this.bord.join('').match(/0/g) || []).length;
        },
        b: function () {
            return (this.bord.join('').match(/1/g) || []).length;
        },
    },
    methods: {
        setPiece: function (x, y) {

            if (this.bord[x][y] != 9) return;

            let changeFlg = false;

            for (let i = 0; i < dirAll.length; i += 1) {
                let n = 1;
                let checkFlg = true;
                const passPosition = [];
                let position = { x: x + dirAll[i][0], y: y + dirAll[i][1] };
                if (1 <= position.x && position.x <= 8
                    && 1 <= position.y && position.y <= 8) {
                    let piece = this.bord[position.x][position.y];
                    while (checkFlg) {
                        if (piece === this.wb && passPosition.length !== 0) {
                            passPosition.forEach(p => {
                                this.bord[p.x][p.y] = this.wb;
                            });
                            checkFlg = false;
                            changeFlg = true;
                        } else if (piece !== this.wb && piece !== 9) {
                            if (0 < x + dirAll[i][0] * n && x + dirAll[i][0] * n <= 8
                                && 0 < y + dirAll[i][1] * n && y + dirAll[i][1] * n <= 8) {
                                const pos = { x: x + dirAll[i][0] * n, y: y + dirAll[i][1] * n }
                                piece = this.bord[x + dirAll[i][0] * n][y + dirAll[i][1] * n];
                                passPosition.push(pos);
                            } else {
                                checkFlg = false;
                            }
                        } else {
                            checkFlg = false;
                        }
                        n = (n + 1) | 0;
                    }
                }
            }
            if (changeFlg) {
                this.bord[x][y] = this.wb;
                this.wb = 1 - this.wb;
            }
        },
        pass: function () {
            this.wb = 1 - this.wb;
        },
    },
});