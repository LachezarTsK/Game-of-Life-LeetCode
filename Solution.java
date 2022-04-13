
public class Solution {

    private static final int WAITING = 0;
    private static final int LIVE = 1;
    private static final int WAITING_VALUE_DURING_INPLACE_UPDATE = -1;
    private static final int LIVE_VALUE_DURING_INPLACE_UPDATE = 2;
    private static final int[][] moves = {
        {-1, 0}, {1, 0}, {0, -1}, {0, 1},
        {-1, -1}, {1, 1,}, {1, -1}, {-1, 1}
    };
    private int rows;
    private int columns;

    public void gameOfLife(int[][] board) {
        rows = board.length;
        columns = board[0].length;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                int count = countNeighbours(board, r, c);
                board[r][c] = temporaryValueDuringUpdateOfBoard(count, board[r][c]);
            }
        }
        updateBoard(board);
    }

    private void updateBoard(int[][] board) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                board[r][c] = finalValueOnUpdatedBoard(board[r][c]);
            }
        }
    }

    private int finalValueOnUpdatedBoard(int temporaryValueDuringUpdate) {
        if (temporaryValueDuringUpdate == WAITING_VALUE_DURING_INPLACE_UPDATE) {
            return WAITING;
        }
        return temporaryValueDuringUpdate == LIVE_VALUE_DURING_INPLACE_UPDATE ? LIVE : temporaryValueDuringUpdate;
    }

    private int temporaryValueDuringUpdateOfBoard(int count, int previousValue) {
        if (previousValue == LIVE && (count < 2 || count > 3)) {
            return WAITING_VALUE_DURING_INPLACE_UPDATE;
        }
        return count == 3 && previousValue == WAITING ? LIVE_VALUE_DURING_INPLACE_UPDATE : previousValue;
    }

    private int countNeighbours(int[][] board, int r, int c) {
        int count = 0;
        for (int[] move : moves) {
            int newRow = r + move[0];
            int newColumn = c + move[1];
            if (isInBoard(newRow, newColumn) && Math.abs(board[newRow][newColumn]) == 1) {
                count++;
            }
        }
        return count;
    }

    private boolean isInBoard(int r, int c) {
        return r >= 0 && r < rows && c >= 0 && c < columns;
    }
}
