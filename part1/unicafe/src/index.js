import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (setter, value) => {
    return () => setter(value+1);
  }

  return (
    <div>
    <h1>Give Feedback</h1>
    <Button handleClick={handleFeedback(setGood, good)} text='good'/>
    <Button handleClick={handleFeedback(setNeutral, neutral)} text='neutral'/>
    <Button handleClick={handleFeedback(setBad, bad)} text='bad'/>
    <h1>Statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))