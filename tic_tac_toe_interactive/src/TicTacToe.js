import React, { useState } from "react";

// Constants for theme colors and marks
const COLORS = {
  primary: "#ffffff",
  secondary: "#000000",
  accent: "#2196f3",
};
const SIZE = 3;
const EMPTY_BOARD = Array(SIZE * SIZE).fill(null);

// Helper: get the winning combinations (indexes)
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * Main container for TicTacToe Interactive.
   * Handles all state, board UI, turn display, win/draw logic, and restart.
   */
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState({ winner: null, draw: false });

  // PUBLIC_INTERFACE
  function handleSquareClick(index) {
    // No move if already taken or game over
    if (board[index] !== null || status.winner || status.draw) return;

    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? "X" : "O";
    setBoard(nextBoard);

    // Check for win or draw
    const winner = calculateWinner(nextBoard);
    const draw = !winner && nextBoard.every((val) => val);
    setStatus({ winner, draw });
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setStatus({ winner: null, draw: false });
  }

  function calculateWinner(b) {
    for (let combo of WINNING_COMBOS) {
      const [a, bIndex, c] = combo;
      if (
        b[a] &&
        b[a] === b[bIndex] &&
        b[a] === b[c]
      ) {
        return b[a];
      }
    }
    return null;
  }

  // Status text
  let infoText;
  if (status.winner) {
    infoText = `Winner: ${status.winner}`;
  } else if (status.draw) {
    infoText = "Draw!";
  } else {
    infoText = `Turn: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="ttt-outer">
      <div className="ttt-status">{infoText}</div>
      <div className="ttt-board" role="grid" aria-label="TicTacToe Game Board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="ttt-cell"
            onClick={() => handleSquareClick(idx)}
            aria-label={`Row ${Math.floor(idx / SIZE) + 1}, Col ${idx % SIZE + 1} ${cell ? cell : ""}`}
            style={{
              color:
                cell === "X"
                  ? COLORS.accent
                  : cell === "O"
                  ? COLORS.secondary
                  : COLORS.secondary,
              boxShadow:
                status.winner && WINNING_COMBOS.some(
                  combo =>
                    combo.includes(idx) &&
                    combo.every(i => board[i] === cell && cell)
                )
                  ? `0 0 0 3px ${COLORS.accent} inset`
                  : undefined,
            }}
            disabled={!!cell || status.winner || status.draw}
            tabIndex={0}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="ttt-restart" onClick={handleRestart}>
        Restart Game
      </button>
      {/* Inline minimal styling (preferably move to CSS file in larger project) */}
      <style>{`
        .ttt-outer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          background: ${COLORS.primary};
          border-radius: 14px;
          max-width: 360px;
          margin: 40px auto 0 auto;
          box-shadow: 0 2px 24px rgba(33, 150, 243, 0.05);
          padding: 28px 18px 34px 18px;
        }
        .ttt-status {
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 22px;
          color: ${COLORS.accent};
          letter-spacing: 0.5px;
          text-align: center;
          min-height: 1.8em;
        }
        .ttt-board {
          display: grid;
          grid-template-columns: repeat(3, 70px);
          grid-template-rows: repeat(3, 70px);
          gap: 8px;
          margin-bottom: 26px;
        }
        .ttt-cell {
          width: 70px;
          height: 70px;
          font-size: 2.8rem;
          font-weight: 700;
          background: ${COLORS.primary};
          color: ${COLORS.secondary};
          border: 2px solid ${COLORS.accent};
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s, border 0.2s, box-shadow 0.18s;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          user-select: none;
        }
        .ttt-cell:disabled {
          background: #f5f7fa;
          cursor: default;
          color: #aaa;
        }
        .ttt-restart {
          margin-top: 6px;
          background: ${COLORS.accent};
          color: ${COLORS.primary};
          border: none;
          border-radius: 5px;
          padding: 10px 27px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(33,150,243,0.09);
          transition: background 0.18s, box-shadow 0.18s;
        }
        .ttt-restart:hover, .ttt-restart:focus {
          background: #1976d2;
        }
        @media (max-width: 480px) {
          .ttt-board {
            grid-template-columns: repeat(3, 48px);
            grid-template-rows: repeat(3, 48px);
          }
          .ttt-cell {
            width: 48px;
            height: 48px;
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}

export default TicTacToe;
