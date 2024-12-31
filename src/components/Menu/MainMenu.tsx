import { useContext } from "preact/hooks"
import { GameContext } from "../../context/gameContext"

const MainMenu = () => {
  const { showMainMenu } = useContext(GameContext);
  return (
    showMainMenu && <div className="menu">
      <h1>YOU START</h1>
      <div>
        <button>EASY</button>
        <button>HARD</button>
      </div>
    </div>
  )
}

export default MainMenu
