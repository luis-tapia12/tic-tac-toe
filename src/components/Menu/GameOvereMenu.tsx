import { useContext } from "preact/hooks";
import { GameContext } from "../../context/gameContext";

const GameOvereMenu = () => {
    const { showGameOver, nextMatch, reset } = useContext(GameContext);
    
  return (
    showGameOver && <div className="menu">
      <h1>GAME OVER</h1>
      <div>
        <button onClick={nextMatch}>CONTINUE</button>
        <button onClick={reset}>RESTART</button>
      </div>
    </div>
  )
}

export default GameOvereMenu
