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
 
const Header = ({name}) => <h1>{name}</h1>;

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

export default Course