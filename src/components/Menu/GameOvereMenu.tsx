import { useContext } from "preact/hooks";
import { GameContext } from "../../context/gameContext";

const GameOvereMenu = () => {
    const { showGameOver } = useContext(GameContext);
    
  return (
    showGameOver && <div className="menu">
      <h1>GAME OVER</h1>
      <div>
        <button>CONTINUE</button>
        <button>RESTART</button>
      </div>
    </div>
  )
}

export default GameOvereMenu
