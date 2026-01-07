import React from "react";

/**
 * Controls provide reset and undo actions.
 */
 // PUBLIC_INTERFACE
function Controls({ onReset, onUndo, canUndo, gameOver }) {
  return (
    <section className="controls" aria-label="Game controls">
      <button type="button" className="btn btnPrimary" onClick={onReset}>
        New Game
      </button>

      <button
        type="button"
        className="btn btnSecondary"
        onClick={onUndo}
        disabled={!canUndo}
        aria-disabled={!canUndo}
        title={!canUndo ? "No moves to undo" : "Undo last move"}
      >
        Undo Last Move
      </button>

      <div className="controlsHint" aria-live="polite">
        {gameOver ? "Game over. Start a new game or review the history." : "Play continues until a win or draw."}
      </div>
    </section>
  );
}

export default Controls;
