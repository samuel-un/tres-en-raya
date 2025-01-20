import "./Game.css";
import { useState } from "react";
import Board from "./Board";

const Game = () => {
	// Estados del juego: tablero, jugador actual y ganador
	const [board, setBoard] = useState(Array(9).fill(null));
	const [currentPlayer, setCurrentPlayer] = useState("X");
	const [winner, setWinner] = useState(null);

	// Función para manejar clics en las casillas
	const handleClick = (index) => {
		// Si la casilla está ocupada o hay ganador, no hacer nada
		if (board[index] || winner) return;

		// Actualizar el tablero
		const newBoard = [...board];
		newBoard[index] = currentPlayer;
		setBoard(newBoard);

		// Cambiar de turno
		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

		// Verificar ganador
		checkWinner(newBoard);
	};

	// Función para verificar el ganador
	const checkWinner = (currentBoard) => {
		const winningCombinations = [
			[0, 1, 2], // Filas
			[3, 4, 5], // Filas
			[6, 7, 8], // Filas
			[0, 3, 6], // Columnas
			[1, 4, 7], // Columnas
			[2, 5, 8], // Columnas
			[0, 4, 8], // Diagonales
			[2, 4, 6], // Diagonales
		];

		for (let combination of winningCombinations) {
			const [a, b, c] = combination;
			if (
				currentBoard[a] &&
				currentBoard[a] === currentBoard[b] &&
				currentBoard[a] === currentBoard[c]
			) {
				setWinner(currentBoard[a]);
				return;
			}
		}

		// Verificar si hay empate
		if (currentBoard.every((cell) => cell)) {
			setWinner("Empate");
		}
	};

	// Función para reiniciar el juego
	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setCurrentPlayer("X");
		setWinner(null);
	};

	// Renderizado del componente
	return (
		<div className="game">
			<h1>Tres en Raya</h1>
			<p>
				{winner ? `Ganador: ${winner}` : `Turno de: ${currentPlayer}`}
			</p>
			<Board squares={board} onClick={handleClick} />
			<button className="reset-button" onClick={resetGame}>
				Reiniciar Juego
			</button>
		</div>
	);
};

export default Game;
