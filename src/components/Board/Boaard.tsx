import { useContext } from "preact/hooks";

import { GameContext } from "../../context/gameContext";
import { O_CELL, X_CELL } from "../../utils/constants";

const renderCell = (cell: number) => {
  if (cell === X_CELL) {
    return 'X';
  }
  if (cell === O_CELL) {
    return 'O';
  }
  return '';
}

const Board = () => {
  const { board } = useContext(GameContext);
  return (
    <div className="board">
      {board.map((cell, cellIndex) => <button className="cell" key={cellIndex}>{renderCell(cell)}</button>)}
    </div>
  )
}

export default Board
