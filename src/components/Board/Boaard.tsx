import { useContext } from "preact/hooks";

import { GameContext } from "../../context/gameContext";

const Board = () => {
  const { board } = useContext(GameContext);
  return (
    <div>
      {board.map((cell, cellIndex) => <button key={cellIndex}>{cell}</button>)}
    </div>
  )
}

export default Board
