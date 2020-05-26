import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const BestAnecdote = (props) => {
  return (
    <>
    <h1>Anecdote with the most votes</h1>
    <p>{anecdotes[props.best]}</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const getRandomAnecdote = () => {
    let newSelected = Math.round(Math.random()*5);
    setSelected(newSelected);
  }

  const setVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);

    console.log(newPoints);
  } 

  const indexOfMax = (arr) => {
    return arr.indexOf(arr.reduce((a,b) => Math.max(a,b)));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        <Button handleClick={ () => setVote()} text='vote' />
        <Button handleClick={ () => getRandomAnecdote()} text='next anecdote' />
      </div>
      <BestAnecdote best={indexOfMax(points)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)