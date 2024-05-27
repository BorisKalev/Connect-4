import React, { useState, useEffect } from "react";
import Modal from "./Modal";
function Connect4() {
  const initialBoard = Array.from({ length: 6 }, () => Array(7).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [thereIsAWinner, setThereIsAWinner] = useState(false);
  let [winsPlayer1, setWinsPlayer1] = useState(0);
  let [winsPlayer2, setWinsPlayer2] = useState(0);
  const [modalContent, setModalContent] = useState("");

  const handleMouseEnter = (col) => {
    setHoveredColumn(col);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  const handleOnClickEvent = (col) => {
    for (let row = 5; row >= 0; row--) {
      if (board[row][col] === null) {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = playerTurn ? "🔴" : "🟡";
        setBoard(newBoard);
        setPlayerTurn(!playerTurn);
        checkForWinner(newBoard);
        return;
      }
    }
  };

  const checkForWinner = () => {
    const rows = board.length;
    const cols = board[0].length;
    // Check if the board is complete
    const boardComplete = board.every((row) =>
      row.every((cell) => cell !== null)
    );
    if (boardComplete) {
      resetBoard();
    }

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        const cell = board[rowIndex][colIndex];
        if (cell) {
          let checkForHorizontalWinnerCounter = 1;
          let checkForVerticalWinnerCounter = 1;
          let checkForRightDiagonalWinnerCounter = 1;
          let checkForLeftDiagonalWinnerCounter = 1;
          // check for horizontal win

          for (let i = 1; i < 4 && cols > colIndex + i; i++) {
            if (cell === board[rowIndex][colIndex + i]) {
              checkForHorizontalWinnerCounter++;
            } else {
              break;
            }
          }
          // check for vertical win

          for (let i = 1; i < 4 && rows > rowIndex + i; i++) {
            if (cell === board[rowIndex + i][colIndex]) {
              checkForVerticalWinnerCounter++;
            } else {
              break;
            }
          }

          // Check for right diagonal win
          for (
            let i = 1;
            i < 4 && cols > colIndex + i && rows > rowIndex + i;
            i++
          ) {
            if (cell === board[rowIndex + i][colIndex + i]) {
              checkForRightDiagonalWinnerCounter++;
            } else {
              break;
            }
          }

          // check for left diagonal win
          for (
            let i = 1;
            i < 4 && rows > rowIndex + i && colIndex - i >= 0;
            i++
          ) {
            if (cell === board[rowIndex + i][colIndex - i]) {
              checkForLeftDiagonalWinnerCounter++;
            } else {
              break;
            }
          }

          if (
            checkForHorizontalWinnerCounter === 4 ||
            checkForVerticalWinnerCounter === 4 ||
            checkForLeftDiagonalWinnerCounter === 4 ||
            checkForRightDiagonalWinnerCounter === 4
          ) {
            if (cell === "🔴") {
              setWinsPlayer1((prev) => prev + 1);
              setModalContent("Player 1 wins this round!");
            } else if (cell === "🟡") {
              setWinsPlayer2((prev) => prev + 1);
              setModalContent("Player 2 wins this round!");
            }
            setThereIsAWinner(true);
            resetBoard();
            return;
          }
        }
      }
    }
  };

  function resetBoard() {
    setBoard(initialBoard);
    setPlayerTurn(true);
  }

  function resetGame() {
    resetBoard();
    setWinsPlayer1(0);
    setWinsPlayer2(0);
    setThereIsAWinner(false);
  }

  useEffect(() => {
    checkForWinner();
  }, [board]);

  return (
    <>
      <h1 className="title">Connect 4</h1>
      <h2>Player turn ({playerTurn ? "🔴" : "🟡"})</h2>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`${hoveredColumn === colIndex ? "hovered" : ""} ${
                    cell ? "filled" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(colIndex)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleOnClickEvent(colIndex)}
                  style={{
                    "--player-color": cell === "🔴" ? "#F8312F" : "#FFD700",
                  }}
                >
                  <div className="circle">{cell}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div id="legs">
        <div id="left-leg"></div>
        <div id="right-leg"></div>
      </div>
      <h5>Player 1 win(s) : {winsPlayer1}</h5>
      <h5>Player 2 win(s) : {winsPlayer2}</h5>
      <Modal
        isOpen={thereIsAWinner}
        content={modalContent}
        anotherRound={() => {
          setThereIsAWinner(false);
          resetBoard();
        }}
        restartGame={() => {
          resetGame();
        }}
      />
    </>
  );
}

export default Connect4;
