import React from "react";
import "./styles.css";
import {useState} from "react";

function Square({value,handleSquareClick}) {
  return (
    <button className="square" onClick={handleSquareClick}>{value}</button>
  );
  
}

 function Board({next, square, onPlay}) {

  function handleClick(i) {
      
    if(square[i] || calculateWinner(square))
      {
        return;
      }

    const nextSquare = square.slice();
    if(next)
    {
      nextSquare[i] = '0';
    }
    else{
      nextSquare[i] = 'X';
    }
   onPlay(nextSquare);
  }

  const winner = calculateWinner(square)
  let status;
  if(winner)
  {
    status = "Winner is" +winner;
  }
  else 
  {
    status = "Next Player" + (next ? 'X' : '0' );
  }


  return (
    <React.Fragment>
    <div class="status">{status}</div>
    <div class="board-row">
      <Square value={square[0]} handleSquareClick={()=> handleClick(0)}></Square>
      <Square value={square[1]} handleSquareClick={()=> handleClick(1)}></Square>
      <Square value={square[2]} handleSquareClick={()=> handleClick(2)}></Square>
    </div>
    <div className="board-row">
      <Square value={square[3]} handleSquareClick={()=> handleClick(3)}></Square>
      <Square value={square[4]} handleSquareClick={()=> handleClick(4)}></Square>
      <Square value={square[5]} handleSquareClick={()=> handleClick(5)}></Square>
    </div>
    <div className="board-row">
      <Square value={square[6]} handleSquareClick={()=> handleClick(6)}></Square>
      <Square value={square[7]} handleSquareClick={()=> handleClick(7)}></Square>
      <Square value={square[8]} handleSquareClick={()=> handleClick(8)}></Square>
    </div>
    </React.Fragment>
  );
}

function calculateWinner(square) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i<lines.length; i++)
  {
    const[a, b, c] = lines[i];
    if(square[a] && square[a] === square[b] && square[a] === square[c])
    {
      return square[a];
    }
  }
  return null;
  }

  export default function Game() {
 
  const [next, setNext] = useState(true);
  const [historysquare, setHistorySquare] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentsquare = historysquare[currentMove];

  function handleplay(nextSquare) {
    const nexthistory = [...historysquare.slice(0, currentMove+1), nextSquare];
    setHistorySquare(nexthistory);
    setCurrentMove(nexthistory.length-1);
    setNext(!next);

  }
 
  function jumptoNext(nextmove){
    setCurrentMove(nextmove);
    setNext(next %2 === 0);

  }

  const Moves = historysquare.map((square, move) => {
    let description;
    if(move > 0)
    {
      description = "Go to next move #" + move;
    }
    else{
      description = "Go to the game start";
    }
    return (
      <li key={move}>
        <button onClick={ () => jumptoNext(move)}>{description}</button>
      </li>
    )

    
  })
    return(
      <div>
        <Board next={next} square={currentsquare} onPlay={handleplay}>  
        </Board>
        <ol>
          {Moves}
        </ol>    
      </div>
    )
  }