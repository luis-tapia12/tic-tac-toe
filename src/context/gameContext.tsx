import { ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";

import { EMPTY_CELL } from "../utils/constants";
import type { CellValue } from "../utils/types";

const NUM_CELLS = 9;
const DEFAULT_TIME = 60;

type GameState = {
    board: CellValue[];
    timeLeft: number;
    xScore: number;
    oScore: number;
};

type GameProviderProps = {
    children: ComponentChildren;
}

const defaultBoard = new Array(NUM_CELLS).fill(EMPTY_CELL);

export const GameContext = createContext<GameState>(null!);

const GameProvider = ({ children}: GameProviderProps) => {
    const [board, setBoard] = useState<CellValue[]>(defaultBoard);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);

    return <GameContext.Provider
        value={{
            board,
            timeLeft,
            xScore,
            oScore
        }}
    >
        {children}
    </GameContext.Provider>
}

export default GameProvider;