import React from "react";
import Square from "./Square";

/**
 * Board renders the 3x3 grid for Tic Tac Toe.
 */
 // PUBLIC_INTERFACE
function Board({ squares, onPlay, winningLine, disabled, nextPlayer }) {
  const renderSquare = (index) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    const isWinning = Array.isArray(winningLine) && winningLine.includes(index);

    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onPlay(index)}
        isWinning={isWinning}
        disabled={disabled || Boolean(squares[index])}
        ariaLabel={`Place ${nextPlayer} on row ${row} column ${col}`}
      />
    );
  };

  return (
    <div className="boardWrap">
      <div className="boardGrid" role="grid" aria-label="Tic Tac Toe board">
        {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
      </div>
      <p className="boardHint" aria-live="polite">
        Tip: Use Tab to focus squares, then Enter/Space to play.
      </p>
    </div>
  );
}

export default Board;
