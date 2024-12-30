import { useContext } from "preact/hooks"
import { GameContext } from "../../context/gameContext"

const Score = () => {
  const { timeLeft, xScore, oScore } = useContext(GameContext);
  return (
    <div>
      <div>
        <div>
          <div>X</div>
          <div>{xScore}</div>
        </div>
        <div>YOU</div>
      </div>
      <div>
        <div>{timeLeft}</div>
        <div>TIME</div>
      </div>
      <div>
        <div>
          <div>{oScore}</div>
          <div>O</div>
        </div>
        <div>CPU</div>
      </div>
    </div>
  )
}

export default Score
