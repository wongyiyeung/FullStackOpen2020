import React, { useState } from 'react'

const Numbers = ({contactList}) => {
return (
  <>
    {contactList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');

  const submitNewContact = (event) => {
    event.preventDefault()

    const newContact = {name: newName, number: newNumber};
    let hasContact = false;

    for(let i=0; i<persons.length; ++i){
      if(persons[i].name === newContact.name){
        window.alert(`${newContact.name} is already added to phonebook`);
        hasContact = true;
      }
    }

    if(hasContact === false){
      setPersons(persons.concat(newContact))
    }
    setNewNumber('');
    setNewName('');
  }

  const changeName = (event) => {
    setNewName(event.target.value);
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNewContact}>
        <div>
          name: <input onChange={changeName} value={newName}/>
        </div>
        <div>
          number: <input onChange={changeNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers contactList={persons} />
    </div>
  )
}

export default App
