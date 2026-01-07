import React, { useMemo, useState } from "react";
import StatusBar from "./components/StatusBar";
import Board from "./components/Board";
import Controls from "./components/Controls";
import History from "./components/History";
import { calculateWinner } from "./utils/ticTacToe";
import "./styles/theme.css";

/**
 * App renders a complete two-player Tic Tac Toe game.
 * Features:
 * - 3x3 board, alternating X/O moves
 * - Win/draw detection with winning line highlight
 * - Undo and New Game
 * - Move history with time-travel
 */
 // PUBLIC_INTERFACE
function App() {
  // History stores snapshots of board state and metadata per move.
  const [history, setHistory] = useState(() => [
    {
      squares: Array(9).fill(null),
      lastMove: null, // { index, row, col, player }
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const xIsNext = stepNumber % 2 === 0;

  const winnerResult = useMemo(
    () => calculateWinner(current.squares),
    [current.squares]
  );

  const gameOver = Boolean(winnerResult.winner) || winnerResult.isDraw;
  const currentPlayer = xIsNext ? "X" : "O";

  const status = useMemo(() => {
    if (winnerResult.winner) return `Player ${winnerResult.winner} won`;
    if (winnerResult.isDraw) return "Draw";
    return `Player ${currentPlayer}’s turn`;
  }, [winnerResult.winner, winnerResult.isDraw, currentPlayer]);

  const handlePlayAtIndex = (index) => {
    if (gameOver) return;
    if (current.squares[index]) return;

    const nextSquares = current.squares.slice();
    nextSquares[index] = currentPlayer;

    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;

    const nextHistory = history.slice(0, stepNumber + 1);
    nextHistory.push({
      squares: nextSquares,
      lastMove: { index, row, col, player: currentPlayer },
    });

    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setHistory([
      { squares: Array(9).fill(null), lastMove: null },
    ]);
    setStepNumber(0);
  };

  // PUBLIC_INTERFACE
  const undoLastMove = () => {
    // Undo is simply stepping back one move, if possible.
    if (stepNumber === 0) return;
    setStepNumber((s) => Math.max(0, s - 1));
  };

  // PUBLIC_INTERFACE
  const jumpTo = (moveIndex) => {
    if (moveIndex < 0 || moveIndex >= history.length) return;
    setStepNumber(moveIndex);
  };

  return (
    <div className="appRoot">
      <div className="appShell">
        <StatusBar
          status={status}
          currentPlayer={currentPlayer}
          winner={winnerResult.winner}
          isDraw={winnerResult.isDraw}
          stepNumber={stepNumber}
        />

        <main className="mainGrid" aria-label="Tic Tac Toe game area">
          <section className="boardCard" aria-label="Game board">
            <Board
              squares={current.squares}
              onPlay={handlePlayAtIndex}
              winningLine={winnerResult.line}
              disabled={gameOver}
              nextPlayer={currentPlayer}
            />
          </section>

          <aside className="historyCard" aria-label="Move history panel">
            <History
              history={history}
              stepNumber={stepNumber}
              onJumpTo={jumpTo}
            />
          </aside>
        </main>

        <Controls
          onReset={resetGame}
          onUndo={undoLastMove}
          canUndo={stepNumber > 0}
          gameOver={gameOver}
        />
      </div>
    </div>
  );
}

export default App;
