import React from "react";

/**
 * Square is a single cell (button) on the Tic Tac Toe board.
 */
 // PUBLIC_INTERFACE
function Square({ value, onClick, isWinning, disabled, ariaLabel }) {
  const valueClass =
    value === "X" ? "squareValueX" : value === "O" ? "squareValueO" : "";

  return (
    <button
      type="button"
      className={[
        "square",
        value ? "squareFilled" : "",
        isWinning ? "squareWinning" : "",
        valueClass,
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className="squareValue" aria-hidden="true">
        {value || ""}
      </span>
    </button>
  );
}

export default Square;
