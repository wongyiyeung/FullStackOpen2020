import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return (
    <div>
    <Header course={props.course} />
    <Content course={props.course} />
    <Total course={props.course} />
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Content = (props) => {
  return (
    <>
    <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
    <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
    <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </>
  )
}

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = (props) => {
  const total = props.course.parts.reduce((sum, part) => sum += part.exercises, 0);
  return (
    <p><strong>Number of exercises:</strong> {total}</p>  
  )
}

const App = () => {
  const course = 
  {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))