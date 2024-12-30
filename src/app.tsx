import Board from "./components/Board/Boaard";
import Menu from "./components/Menu/Menu";
import Score from "./components/Score/Score";

export function App() {

  return (
    <>
      <Menu />
      <div>
        <h1>Tic Tac Toe</h1>
        <Board />
        <Score />
      </div>
    </>
  )
}
