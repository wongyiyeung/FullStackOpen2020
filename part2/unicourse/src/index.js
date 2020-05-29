import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return (
    <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total course={course} />
    </>
  )
}

const Header = ({name}) => (
  <h1>{name}</h1>
)

const Content = ({parts}) => {
  return (
    <>
    {parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}
    </>
  )
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>;

const Total = (props) => {
  const total = props.course.parts.reduce((sum, part) => sum += part.exercises, 0);
  return (
    <p><strong>Number of exercises:</strong> {total}</p>  
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
    {courses.map((c) => <Course key={c.id} course={c} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))