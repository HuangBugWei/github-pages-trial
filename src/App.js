import './App.css';
import { ForceGraph3D } from 'react-force-graph';
import { useState } from 'react';
import { startGame, guess, restart, shoot } from './axios'

function App() {
  // top
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  // const [whichMode, setWhichMode] = useState(true)
  const [whichMode, setWhichMode] = useState(0)
  
  // Number guessing
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [upperbound, setUpperBound] = useState(100)
  const [lowerbound, setLowerBound] = useState(1)
  
  // rock-paper-scissors const
  const [rockstatus, setRockStatus] = useState('')
  const [gamer, setGamer] = useState('')
  const [compu, setCompu] = useState('')

  const handleGuess = async () => {
    const response = await guess(number)
    
    setStatus(response)

    if (response === 'Bang!!!') {
      setHasWon(true)
    }
    else if (response === 'Higher') {
      setLowerBound(number)
      setNumber('')
    }
    else if (response === 'Lower') {
      setUpperBound(number)
      setNumber('')
    }
    
  }

  const handleRockGame = async () => {
    const {msg, oppon} = await shoot(0)
    setGamer('Rock')
    setCompu(oppon)
    setRockStatus(msg)
  }

  const handlePapeGame = async () => {
    const {msg, oppon} = await shoot(1)
    setGamer('Paper')
    setCompu(oppon)
    setRockStatus(msg)
  }

  const handleScisGame = async () => {
    const {msg, oppon} = await shoot(2)
    setGamer('Scissors')
    setCompu(oppon)
    setRockStatus(msg)
  }

  const startMenu = (
    <div>
      {/* someFunctionToBackend; and setHasStarted */}
      <button onClick={ async() => {
        setHasStarted(true)
        setWhichMode(0)
        setHasWon(false)
        let msg = await startGame()
        setStatus(msg)
        setUpperBound(100)
        setLowerBound(1)
        setNumber('')
      }}>Number Guessing</button>
      <button onClick={ async() => {
        setHasStarted(true)
        setWhichMode(1)
        setHasWon(false)
        setGamer('')
        setCompu('')
        setRockStatus('')
      }}>Rock, Paper, Scissors!</button>
      <button onClick={ async() => {
        setHasStarted(true)
        setWhichMode(2)
        setHasWon(false)
        setGamer('')
        setCompu('')
        setRockStatus('')
      }}>test node demo</button>
    </div>
  )

  const numberGuessing = (
    <div>
      <p>Guess a number between {lowerbound} to {upperbound}</p>
      <input value={number} onChange={(e) => {setNumber(e.target.value)}}></input>
      <button onClick={ handleGuess } disabled={!number}>guess!</button>
      <p>{status}</p>
    </div>
  )

  const rock = (
    <div>
      <p>Click below button to choose the statement.</p>
      <button onClick={ handleRockGame } >Rock</button>
      <button onClick={ handlePapeGame } >Paper</button>
      <button onClick={ handleScisGame } >Scissors</button>
      <p>You: {gamer}, Computer: {compu}</p>
      <p>{rockstatus}</p>
      <div>
        <button onClick={() => {setHasStarted(false)}}>back to menu</button>
      </div>
    </div>
  )
  
  const winningMode = (
    <div>
      <p>you won! the number was {number}.</p>
      <div>
        <button onClick = {async() => {
          setHasWon(false)
          let msg = await restart()
          setStatus(msg)
          setUpperBound(100)
          setLowerBound(1)
          setNumber('')
        }}>restart</button>
        <button onClick={() => {setHasStarted(false)}}>back to menu</button>
      </div>
    </div>  
  )
  const N = 300;
  const myData = {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        source: id,
        target: Math.round(Math.random() * (id-1))
      }))
  };

  const sampleNode = (
    <ForceGraph3D graphData={myData}/>
  )
  const gameMode = (
    <div>
      {/* {whichMode ? numberGuessing : rock} */}
      {whichMode === 0 ? numberGuessing 
      : whichMode === 1 ? rock : sampleNode}
    </div>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )
  

  return (
    <div className='App'>
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
