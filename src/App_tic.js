import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquare = Array.from(squares);

    if (xIsNext) nextSquare[i] = 'X';
    else nextSquare[i] = 'O';

    onPlay(nextSquare);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'winner : ' + winner;
  } else {
    status = 'Next player : ' + (xIsNext ? 'X' : 'O');
  }

  const board = (num) => {
    let res = [];
    for (let i = 0; i < num; i++) {
      res.push(<div className='board-row'></div>);
      for (let j = 0; j < num; j++) {
        res.push(
          <Square
            value={squares[i * num + j]}
            onSquareClick={() => handleClick(i * num + j)}
          />
        );
      }
    }
    return res;
  };
  return (
    <>
      <div className='status'>{status}</div>
      {board(3)}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function App() {
  return <Game />;
}

export default App;
