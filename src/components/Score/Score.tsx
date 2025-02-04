import { useContext } from 'preact/hooks';
import { GameContext } from '../../context/gameContext';

const Score = () => {
	const { timeLeft, xScore, oScore } = useContext(GameContext);
	return (
		<div className="score-container">
			<div>
				<div className="score">
					<div>O</div>
					<div className="score-value">{oScore}</div>
				</div>
				<div>YOU</div>
			</div>
			<div>
				<div className="time">{timeLeft.toString().padStart(2, '0')}</div>
				<div>TIME</div>
			</div>
			<div>
				<div className="score">
					<div className="score-value">{xScore}</div>
					<div>X</div>
				</div>
				<div>CPU</div>
			</div>
		</div>
	);
};

export default Score;
