import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part part={props.part[0]} exercises={props.exercises[0]}/>
    <Part part={props.part[1]} exercises={props.exercises[1]}/>
    <Part part={props.part[2]} exercises={props.exercises[2]}/>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
  <p>Number of exercises {props.total}</p>  
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React','Using props to pass data','State of a component']
  const exercises = [10,7,14]
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content part={parts} exercises={exercises}/>
      <Total total={exercises[0] + exercises[1] + exercises[2]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))