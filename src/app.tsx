import Board from './components/Board/Boaard';
import GameOvereMenu from './components/Menu/GameOvereMenu';
import MainMenu from './components/Menu/MainMenu';
import Score from './components/Score/Score';

export function App() {
	return (
		<>
			<MainMenu />
			<GameOvereMenu />
			<div>
				<h1>Tic Tac Toe</h1>
				<Board />
				<Score />
				<span className="version">v{import.meta.env.VITE_APP_VERSION}</span>
			</div>
		</>
	);
}
