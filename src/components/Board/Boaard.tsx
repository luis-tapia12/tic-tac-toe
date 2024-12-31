import { useContext } from "preact/hooks";

import { GameContext } from "../../context/gameContext";
import { O_CELL, X_CELL } from "../../utils/constants";
import type { CellValue } from "../../utils/types";

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
  const { board, selectCell } = useContext(GameContext);
  return (
    <div className="board">
      {board.map((cell, cellIndex) => 
        <button className="cell" key={cellIndex} onClick={selectCell.bind(this, cellIndex as CellValue)}>
          {renderCell(cell)}
        </button>)}
    </div>
  )
}

export default Board
