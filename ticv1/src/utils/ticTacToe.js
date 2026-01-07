/**
 * Utility functions for Tic Tac Toe rules.
 */

const LINES = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Determine winner and winning line, or draw state.
 *
 * @param {Array<("X"|"O"|null)>} squares - length 9 board state
 * @returns {{winner: ("X"|"O"|null), line: number[]|null, isDraw: boolean}}
 */
 // PUBLIC_INTERFACE
export function calculateWinner(squares) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line, isDraw: false };
    }
  }

  const isDraw = squares.every((s) => s !== null);
  return { winner: null, line: null, isDraw };
}
