const NQueenCode = {
  Java: `public class NQueens {
    // Function to print the solution
    public static void printSolution(int[][] board) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
    }

    // Function to check if a queen can be placed on board[row][col]
    public static boolean isSafe(int[][] board, int row, int col) {
        // Check this column on upper side
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 1) {
                return false;
            }
        }

        // Check upper diagonal on left side
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 1) {
                return false;
            }
        }

        // Check upper diagonal on right side
        for (int i = row, j = col; i >= 0 && j < board.length; i--, j++) {
            if (board[i][j] == 1) {
                return false;
            }
        }

        return true;
    }

    // Function to solve N-Queens problem using Backtracking
    public static boolean solveNQueens(int[][] board, int row) {
        if (row >= board.length) {
            return true; // All queens are placed successfully
        }

        for (int i = 0; i < board.length; i++) {
            if (isSafe(board, row, i)) {
                board[row][i] = 1; // Place the queen

                if (solveNQueens(board, row + 1)) {
                    return true;
                }

                board[row][i] = 0; // Backtrack
            }
        }

        return false; // No place for queen in this row
    }

    public static void main(String[] args) {
        int N = 4;
        int[][] board = new int[N][N];

        if (solveNQueens(board, 0)) {
            printSolution(board);
        } else {
            System.out.println("Solution does not exist");
        }
    }
}
`,
  JavaScript: `function printSolution(board) {
    for (let i = 0; i < board.length; i++) {
        let row = "";
        for (let j = 0; j < board[i].length; j++) {
            row += board[i][j] + " ";
        }
        console.log(row);
    }
}

function isSafe(board, row, col) {
    // Check this column on upper side
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) {
            return false;
        }
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }

    // Check upper diagonal on right side
    for (let i = row, j = col; i >= 0 && j < board.length; i--, j++) {
        if (board[i][j] === 1) {
            return false;
        }
    }

    return true;
}

function solveNQueens(board, row) {
    if (row >= board.length) {
        return true;
    }

    for (let i = 0; i < board.length; i++) {
        if (isSafe(board, row, i)) {
            board[row][i] = 1;

            if (solveNQueens(board, row + 1)) {
                return true;
            }

            board[row][i] = 0; // Backtrack
        }
    }

    return false;
}

const N = 4;
const board = Array(N).fill().map(() => Array(N).fill(0));

if (solveNQueens(board, 0)) {
    printSolution(board);
} else {
    console.log("Solution does not exist");
}
`,
  Python: `def print_solution(board):
    for row in board:
        print(" ".join(str(x) for x in row))

def is_safe(board, row, col):
    # Check this column on upper side
    for i in range(row):
        if board[i][col] == 1:
            return False

    # Check upper diagonal on left side
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    # Check upper diagonal on right side
    for i, j in zip(range(row, -1, -1), range(col, len(board))):
        if board[i][j] == 1:
            return False

    return True

def solve_n_queens(board, row):
    if row >= len(board):
        return True

    for i in range(len(board)):
        if is_safe(board, row, i):
            board[row][i] = 1

            if solve_n_queens(board, row + 1):
                return True

            board[row][i] = 0  # Backtrack

    return False

N = 4
board = [[0 for _ in range(N)] for _ in range(N)]

if solve_n_queens(board, 0):
    print_solution(board)
else:
    print("Solution does not exist")
`,
  "C++": `#include <iostream>
using namespace std;

// Function to print the solution
void printSolution(int board[][10], int N) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

// Function to check if a queen can be placed on board[row][col]
bool isSafe(int board[][10], int row, int col, int N) {
    // Check this column on upper side
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 1) {
            return false;
        }
    }

    // Check upper diagonal on left side
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 1) {
            return false;
        }
    }

    // Check upper diagonal on right side
    for (int i = row, j = col; i >= 0 && j < N; i--, j++) {
        if (board[i][j] == 1) {
            return false;
        }
    }

    return true;
}

// Function to solve N-Queens problem using Backtracking
bool solveNQueens(int board[][10], int row, int N) {
    if (row >= N) {
        return true; // All queens are placed successfully
    }

    for (int i = 0; i < N; i++) {
        if (isSafe(board, row, i, N)) {
            board[row][i] = 1; // Place the queen

            if (solveNQueens(board, row + 1, N)) {
                return true;
            }

            board[row][i] = 0; // Backtrack
        }
    }

    return false; // No place for queen in this row
}

int main() {
    int N = 4;
    int board[10][10] = {0};

    if (solveNQueens(board, 0, N)) {
        printSolution(board, N);
    } else {
        cout << "Solution does not exist" << endl;
    }

    return 0;
}
`,
  output: `1 0 0 0 
0 0 0 1 
0 1 0 0 
0 0 1 0`
};

export default NQueenCode;
