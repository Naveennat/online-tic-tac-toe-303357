import React from "react";

/**
 * StatusBar shows the current game status and turn/winner info.
 */
 // PUBLIC_INTERFACE
function StatusBar({ status, currentPlayer, winner, isDraw, stepNumber }) {
  const pillTone = winner
    ? "statusPillWin"
    : isDraw
      ? "statusPillDraw"
      : currentPlayer === "X"
        ? "statusPillX"
        : "statusPillO";

  return (
    <header className="topBar">
      <div className="brand">
        <div className="brandMark" aria-hidden="true" />
        <div className="brandText">
          <div className="brandTitle">Tic Tac Toe</div>
          <div className="brandSubtitle">Two-player • 3×3</div>
        </div>
      </div>

      <div className="statusArea" aria-live="polite">
        <div className={["statusPill", pillTone].join(" ")}>
          {status}
        </div>
        <div className="statusMeta">
          Move: <strong>{stepNumber}</strong>
        </div>
      </div>
    </header>
  );
}

export default StatusBar;
