
#include <array>
#include <vector>
using namespace std;

class Solution {
    
    inline static const int WAITING = 0;
    inline static const int LIVE = 1;
    inline static const int WAITING_VALUE_DURING_INPLACE_UPDATE = -1;
    inline static const int LIVE_VALUE_DURING_INPLACE_UPDATE = 2;
    inline static const array<array<int, 2>, 8> moves{ array<int, 2> 
        {-1, 0},  {1, 0}, {0, -1}, {0, 1}, 
        {-1, -1}, {1, 1}, {1, -1}, {-1, 1}
    };
    size_t rows;
    size_t columns;

public:

    void gameOfLife(vector<vector<int>>& board) {
        rows = board.size();
        columns = board[0].size();

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                int count = countNeighbours(board, r, c);
                board[r][c] = temporaryValueDuringUpdateOfBoard(count, board[r][c]);
            }
        }
        updateBoard(board);
    }

private:

    void updateBoard(vector<vector<int>>& board) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                board[r][c] = finalValueOnUpdatedBoard(board[r][c]);
            }
        }
    }

    int finalValueOnUpdatedBoard(int temporaryValueDuringUpdate) {
        if (temporaryValueDuringUpdate == WAITING_VALUE_DURING_INPLACE_UPDATE) {
            return WAITING;
        }
        return temporaryValueDuringUpdate == LIVE_VALUE_DURING_INPLACE_UPDATE ? LIVE : temporaryValueDuringUpdate;
    }

    int temporaryValueDuringUpdateOfBoard(int count, int previousValue) {
        if (previousValue == LIVE && (count < 2 || count > 3)) {
            return WAITING_VALUE_DURING_INPLACE_UPDATE;
        }
        return count == 3 && previousValue == WAITING ? LIVE_VALUE_DURING_INPLACE_UPDATE : previousValue;
    }

    int countNeighbours(const vector<vector<int>>& board, int r, int c) {
        int count = 0;
        for (const auto& move : moves) {
            int newRow = r + move[0];
            int newColumn = c + move[1];
            if (isInBoard(newRow, newColumn) && abs(board[newRow][newColumn]) == 1) {
                count++;
            }
        }
        return count;
    }

    bool isInBoard(int r, int c) {
        return r >= 0 && r < rows && c >= 0 && c < columns;
    }
};
