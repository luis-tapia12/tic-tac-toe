import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";

import { EMPTY_CELL, O_CELL, X_CELL } from "../utils/constants";
import type { CellValue } from "../utils/types";

const NUM_CELLS = 9;
const DEFAULT_TIME = 60;

type GameState = {
    board: CellValue[];
    timeLeft: number;
    xScore: number;
    oScore: number;
    showMainMenu: boolean;
    showGameOver: boolean;
    selectCell: (cell: number) => void;
    selectDifficulty: (easy: boolean) => void;
};

type GameProviderProps = {
    children: ComponentChildren;
}

const defaultBoard = new Array(NUM_CELLS).fill(EMPTY_CELL);

export const GameContext = createContext<GameState>(null!);

const randomInt = () => Math.floor(Math.random() * NUM_CELLS);

const GameProvider = ({ children}: GameProviderProps) => {
    const [board, setBoard] = useState<CellValue[]>(defaultBoard);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const [showMainMenu, setShowMainMenu] = useState(true);
    const [showGameOver, setShowGameOver] = useState(false);
    const [easy, setEasy] = useState(true);

    useEffect(() => {
        const emptyCells = board.filter(cell => cell === EMPTY_CELL).length;

        if (!(emptyCells % 2) && emptyCells) {
            takeTurn();
        }
    }, [board]);

    const selectDifficulty = (easy: boolean) => {
        setShowMainMenu(false);
        setBoard(defaultBoard);
        setTimeLeft(DEFAULT_TIME);
        setEasy(easy);
    }

    const takeTurn = () => {
        if (easy) {
            makeRandomMove();
        } else {
            minimaxMove();
        }
    }

    const minimaxMove = () => {
        makeRandomMove(); // TODO implement minimax
    }

    const makeRandomMove = () => {
        const emptyCells = board.filter(cell => cell === EMPTY_CELL).length;
        let selectedCell = randomInt();
        while(board[selectedCell] !== EMPTY_CELL && emptyCells) {
            selectedCell = randomInt();
        }
        setBoard((prev) => {
            const nextBoard = [...prev];
            nextBoard[selectedCell] = O_CELL;
            return nextBoard;
        });
    }

    const selectCell = (cell: number) => {
        setBoard((prev) => {
            const nextBoard = [...prev];
            nextBoard[cell] = X_CELL;
            return nextBoard;
        });
    }

    return <GameContext.Provider
        value={{
            board,
            timeLeft,
            xScore,
            oScore,
            showMainMenu,
            showGameOver,
            selectCell,
            selectDifficulty
        }}
    >
        {children}
    </GameContext.Provider>
}

export default GameProvider;