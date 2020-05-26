import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}

const Statistics = ({good,neutral,bad,total,average,positivePercentage}) => {
  if(total === 0){
    return (
      <p>No feedback given</p>
    )
  }
  
  average = average.toFixed(2);
  positivePercentage = positivePercentage.toFixed(2);
  return (
    <table>
    <Statistic text='good' value={good}/>
    <Statistic text='neutral' value={neutral}/>
    <Statistic text='bad' value={bad}/>
    <Statistic text='all' value={total}/>
    <Statistic text='average' value={average}/>
    <Statistic text='positive' value={positivePercentage + '%'}/>
    </table>
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
    <h1>Statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positivePercentage={positivePercentage}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))