import { useContext } from "preact/hooks"
import { GameContext } from "../../context/gameContext"

const MainMenu = () => {
  const { showMainMenu, selectDifficulty } = useContext(GameContext);
  return (
    showMainMenu && <div className="menu">
      <h1>YOU START</h1>
      <div>
        <button onClick={selectDifficulty.bind(this, true)}>EASY</button>
        <button onClick={selectDifficulty.bind(this, false)}>HARD</button>
      </div>
    </div>
  )
}

export default MainMenu
