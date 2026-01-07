import React from "react";

/**
 * History shows move list and allows time-travel.
 */
 // PUBLIC_INTERFACE
function History({ history, stepNumber, onJumpTo }) {
  return (
    <div className="history">
      <div className="historyHeader">
        <h2 className="historyTitle">Move history</h2>
        <div className="historyCount">{history.length - 1} moves</div>
      </div>

      <ol className="historyList" aria-label="Move list">
        {history.map((entry, moveIndex) => {
          const isCurrent = moveIndex === stepNumber;

          let label = "Go to game start";
          if (moveIndex > 0 && entry.lastMove) {
            const { row, col, player } = entry.lastMove;
            label = `Go to move #${moveIndex}: Player ${player} → (${row}, ${col})`;
          }

          return (
            <li key={moveIndex} className="historyItem">
              <button
                type="button"
                className={[
                  "historyBtn",
                  isCurrent ? "historyBtnActive" : "",
                ].join(" ")}
                onClick={() => onJumpTo(moveIndex)}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className="historyBtnText">
                  {moveIndex === 0 ? "Game start" : `Move #${moveIndex}`}
                </span>
                {moveIndex > 0 && entry.lastMove ? (
                  <span className="historyBtnMeta">
                    {entry.lastMove.player} @ {entry.lastMove.row},{entry.lastMove.col}
                  </span>
                ) : (
                  <span className="historyBtnMeta">—</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default History;
