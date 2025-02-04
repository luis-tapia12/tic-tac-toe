#include <emscripten.h>

#define BOARD_SIZE 9
#define EMPTY_CELL 0
#define WINNING_STATES 8
#define MAX_PLAYER 1
#define MIN_PLAYER -1
#define INFINITY 255

int board[BOARD_SIZE] = {0, 0, 0, 0, 0, 0, 0, 0, 0};

const int WINNING_STATES_ARRAY[WINNING_STATES][3] = {
    {0, 1, 2},
    {3, 4, 5},
    {6, 7, 8},
    {0, 3, 6},
    {1, 4, 7},
    {2, 5, 8},
    {0, 4, 8},
    {2, 4, 6}
};

int random_num(int max, int seed)
{
    static unsigned long X = 42;
    X = (1103515245 * X + 12345 + seed) % 2147483648;
    return X % max;
}

EMSCRIPTEN_KEEPALIVE
void load_board(int a0, int a1, int a2, int a3, int a4, int a5, int a6, int a7, int a8)
{
    board[0] = a0;
    board[1] = a1;
    board[2] = a2;
    board[3] = a3;
    board[4] = a4;
    board[5] = a5;
    board[6] = a6;
    board[7] = a7;
    board[8] = a8;
}

EMSCRIPTEN_KEEPALIVE
int board_is_full()
{
    int accumulator = 1;
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        accumulator *= board[i];
    }

    return accumulator != 0;
}

EMSCRIPTEN_KEEPALIVE
int make_random_move(int seed)
{
    int is_full = board_is_full();
    int index = random_num(BOARD_SIZE, seed);
    
    while (board[index] != EMPTY_CELL && is_full == 0)
    {
        index = random_num(BOARD_SIZE, seed);
    }
    return index;
}

EMSCRIPTEN_KEEPALIVE
int check_winner()
{
    for (int index = 0; index < WINNING_STATES; index++)
    {
        if (board[WINNING_STATES_ARRAY[index][0]] == board[WINNING_STATES_ARRAY[index][1]] &&
            board[WINNING_STATES_ARRAY[index][1]] == board[WINNING_STATES_ARRAY[index][2]] &&
            board[WINNING_STATES_ARRAY[index][0]] != EMPTY_CELL)
        {
            return board[WINNING_STATES_ARRAY[index][0]];
        }
    }
    return 0;
}

int min(int a, int b)
{
    return a < b ? a : b;
}

int max(int a, int b)
{
    return a > b ? a : b;
}

int minimax(int board[], int player)
{
    int score = check_winner();

    if (score != 0)
    {
        return score;
    }
    if (board_is_full() == 1)
    {
        return 0;
    }

    if (player == MAX_PLAYER)
    {
        int best = -INFINITY;
        for (int index = 0; index < BOARD_SIZE; index++)
        {
            if (board[index] == EMPTY_CELL)
            {
                board[index] = MAX_PLAYER;
                best = max(best, minimax(board, MIN_PLAYER));
                board[index] = EMPTY_CELL;
            }
        }
        return best;
    }
    else
    {
        int best = INFINITY;
        for (int index = 0; index < BOARD_SIZE; index++)
        {
            if (board[index] == EMPTY_CELL)
            {
                board[index] = MIN_PLAYER;
                best = min(best, minimax(board, MAX_PLAYER));
                board[index] = EMPTY_CELL;
            }
        }
        return best;
    }
}

EMSCRIPTEN_KEEPALIVE
int make_minimax_move()
{
    int score = -INFINITY;
    int best_move = -1;

    for (int index = 0; index < BOARD_SIZE; index++)
    {
        if (board[index] == EMPTY_CELL)
        {
            board[index] = MAX_PLAYER;
            int minimax_value = minimax(board, MIN_PLAYER);
            board[index] = EMPTY_CELL;

            if (minimax_value > score)
            {
                best_move = index;
                score = minimax_value;
            }
        }
    }

    return best_move;
}
