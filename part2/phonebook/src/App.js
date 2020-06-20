import React, { useState, useEffect } from 'react'
import phonebook from './services/contacts'

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



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilerName ] = useState('');

  useEffect(()=>{
    phonebook
      .getAllContacts()
      .then(allContacts => {
        setPersons(allContacts);
      })
  },[]);

  const deleteContact = (person) => {
    if(window.confirm(`Delete ${person.name}?`) === false) return;

    phonebook
      .deleteContact(person.id)
      .then(
        setPersons(persons.filter(p => p.id !== person.id))
      )
  }

  const Contact = ({person}) => {
    return (
      <>
        <div>{person.name} {person.number} <button onClick={() => deleteContact(person)}>delete</button></div>
      </>
    )
  }
  
  const ContactList = ({contactList, filter}) => {
    const filteredContacts = contactList.filter(person => person.name.slice(0, filter.length).localeCompare(filter, 'en', {sensitivity: 'accent'}) === 0);  
    return (
    <>
      {filteredContacts.map(person => <Contact key={person.name} person={person} />)}
    </>
    )
  }

  const submitNewContact = (event) => {
    event.preventDefault()

    const newContact = {name: newName, number: newNumber};
    let hasContact = false;

    persons.forEach(p => {
      if (p.name === newContact.name){
        window.alert(`${newContact.name} is already added to phonebook`);
        hasContact = true;
      }
    });

    if(hasContact === false){
      phonebook
        .addContact(newContact)
        .then(addedContact => {
          setPersons(persons.concat(addedContact));
        })
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
      <ContactList contactList={persons} filter={filterName}/>
    </div>
  )
}

export default App
