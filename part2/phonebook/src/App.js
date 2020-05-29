import React, { useState } from 'react'

const Filter = ({onChange, value}) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={onChange} value={value}/> 
      </div>
    </form>
  )
}

const PersonForm = ({submitHandler, nameChangeHandler, numberChangeHandler, newName, newNumber}) => {
  return (
    <form onSubmit={submitHandler}>
    <div>
      name: <input onChange={nameChangeHandler} value={newName}/>
    </div>
    <div>
      number: <input onChange={numberChangeHandler} value={newNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({contactList, filter}) => {
  const filteredContacts = contactList.filter(person => person.name.slice(0, filter.length).localeCompare(filter, 'en', {sensitivity: 'accent'}) === 0);
  return (
  <>
    {filteredContacts.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilerName ] = useState('');

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

  const changeFilter = (event) => {
    setFilerName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={changeFilter} value={filterName}/>
      <h2>Add new contact</h2>
      <PersonForm submitHandler={submitNewContact} nameChangeHandler={changeName} numberChangeHandler={changeNumber} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons contactList={persons} filter={filterName}/>
    </div>
  )
}

export default App
