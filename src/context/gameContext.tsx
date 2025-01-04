import { ComponentChildren, createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { EMPTY_CELL, O_CELL, X_CELL } from '../utils/constants';
import { loadWasm, WasmModules } from '../utils/loadWasm';
import type { CellValue } from '../utils/types';

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
	nextMatch: () => void;
	reset: () => void;
};

type GameProviderProps = {
	children: ComponentChildren;
};

const defaultBoard = new Array(NUM_CELLS).fill(EMPTY_CELL);

export const GameContext = createContext<GameState>(null!);

const GameProvider = ({ children }: GameProviderProps) => {
	const [modules, setModules] = useState<WasmModules>(null!);
	const [board, setBoard] = useState<CellValue[]>(defaultBoard);
	const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
	const [xScore, setXScore] = useState(0);
	const [oScore, setOScore] = useState(0);
	const [showMainMenu, setShowMainMenu] = useState(true);
	const [showGameOver, setShowGameOver] = useState(false);
	const [easy, setEasy] = useState(true);
	const isRunning = !showMainMenu && !showGameOver;

	useEffect(() => {
		loadWasm().then(setModules);
	}, []);

	useEffect(() => {
		if (timeLeft === 0) {
			setShowGameOver(true);
		}
	}, [timeLeft]);

	useEffect(() => {
		let interval: number | undefined;

		if (isRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isRunning]);

	useEffect(() => {
		const emptyCells = board.filter((cell) => cell === EMPTY_CELL).length;

		if (!emptyCells) {
			setShowGameOver(true);
		}

		if (checkWinner() === null && !(emptyCells % 2) && emptyCells) {
			takeTurn();
		}
	}, [board]);

	const selectDifficulty = (easy: boolean) => {
		setShowMainMenu(false);
		setBoard(defaultBoard);
		setTimeLeft(DEFAULT_TIME);
		setEasy(easy);
	};

	const takeTurn = () => {
		if (easy) {
			makeRandomMove();
		} else {
			minimaxMove();
		}
	};

	const minimaxMove = () => {
		makeRandomMove(); // TODO implement minimax
	};

	const makeRandomMove = () => {
		const selectedCell = modules?.make_random_move(board);
		setBoard((prev) => {
			const nextBoard = [...prev];
			nextBoard[selectedCell] = O_CELL;
			return nextBoard;
		});
	};

	const selectCell = (cell: number) => {
		if (checkWinner() === null && board[cell] === EMPTY_CELL) {
			setBoard((prev) => {
				const nextBoard = [...prev];
				nextBoard[cell] = X_CELL;
				return nextBoard;
			});
		}
	};

	const checkWinner = () => {
		const winner = modules?.check_winner(board);
		if (winner === X_CELL) {
			setXScore((prev) => prev + 1);
			setShowGameOver(true);
			return winner;
		} else if (winner === O_CELL) {
			setOScore((prev) => prev + 1);
			setShowGameOver(true);
			return winner;
		}
		return null;
	};

	const nextMatch = () => {
		setShowGameOver(false);
		setBoard(defaultBoard);
		setTimeLeft(DEFAULT_TIME);
	};

	const reset = () => {
		setXScore(0);
		setOScore(0);
		nextMatch();
		setShowMainMenu(true);
	};

	return (
		<GameContext.Provider
			value={{
				board,
				timeLeft,
				xScore,
				oScore,
				showMainMenu,
				showGameOver,
				selectCell,
				selectDifficulty,
				nextMatch,
				reset,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
