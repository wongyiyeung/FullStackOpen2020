import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good,neutral,bad,total,average,positivePercentage}) => {
  return (
    <>
    <h1>Statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {total}</p>
    <p>average {average}</p>
    <p>positive {positivePercentage}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0.0);
  const [positivePercentage, setPositivePercentage] = useState(0.0);

  const handleFeedback = (newGood, newNeutral, newBad) => {
    return () => {
      setGood(newGood);
      setNeutral(newNeutral);
      setBad(newBad);
      let newTotal = total + 1;
      setAverage((newGood-newBad)/newTotal);
      setPositivePercentage(newGood/newTotal*100.0);
      setTotal(newTotal);
    }
  }

  return (
    <div>
    <h1>Give Feedback</h1>
    <Button handleClick={handleFeedback(good+1,neutral,bad)} text='good'/>
    <Button handleClick={handleFeedback(good,neutral+1,bad)} text='neutral'/>
    <Button handleClick={handleFeedback(good,neutral,bad+1)} text='bad'/>
    <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positivePercentage={positivePercentage}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))