
/**
 * @param {number[][]} board
 * @return {void} 
 */
var gameOfLife = function (board) {

    this.WAITING = 0;
    this.LIVE = 1;
    this.WAITING_VALUE_DURING_INPLACE_UPDATE = -1;
    this.LIVE_VALUE_DURING_INPLACE_UPDATE = 2;
    this.moves = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [1, 1], [1, -1], [-1, 1]
    ];
    this.rows = board.length;
    this.columns = board[0].length;

    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < columns; c++) {
            let count = countNeighbours(board, r, c);
            board[r][c] = temporaryValueDuringUpdateOfBoard(count, board[r][c]);
        }
    }
    updateBoard(board);
};

/**
 * @param {number[][]} board
 * @return {void} 
 */
function  updateBoard(board) {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            board[r][c] = finalValueOnUpdatedBoard(board[r][c]);
        }
    }
}

/**
 * @param {number} temporaryValueDuringUpdate 
 * @return {number} 
 */
function finalValueOnUpdatedBoard(temporaryValueDuringUpdate) {
    if (temporaryValueDuringUpdate === this.WAITING_VALUE_DURING_INPLACE_UPDATE) {
        return this.WAITING;
    }
    return temporaryValueDuringUpdate === this.LIVE_VALUE_DURING_INPLACE_UPDATE ? this.LIVE : temporaryValueDuringUpdate;
}

/**
 * @param {number} count
 * @param {number} previousValue
 * @return {number} 
 */
function temporaryValueDuringUpdateOfBoard(count, previousValue) {
    if (previousValue === this.LIVE && (count < 2 || count > 3)) {
        return this.WAITING_VALUE_DURING_INPLACE_UPDATE;
    }
    return count === 3 && previousValue === this.WAITING ? this.LIVE_VALUE_DURING_INPLACE_UPDATE : previousValue;
}

/**
 * @param {number[][]} board
 * @param {number} r
 * @param {number} c 
 * @return {number} 
 */
function  countNeighbours(board, r, c) {
    let count = 0;
    for (let move of this.moves) {
        let newRow = r + move[0];
        let newColumn = c + move[1];
        if (isInBoard(newRow, newColumn) && Math.abs(board[newRow][newColumn]) === 1) {
            count++;
        }
    }
    return count;
}

/**
 * @param {number} r
 * @param {number} c 
 * @return {boolean} 
 */
function isInBoard(r, c) {
    return r >= 0 && r < this.rows && c >= 0 && c < this.columns;
}
