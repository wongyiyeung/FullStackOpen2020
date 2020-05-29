import React, { useState } from 'react'

const Numbers = ({contactList}) => {
return (
  <>
    {contactList.map(person => <p key={person.name}>{person.name}</p>)}
  </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const submitNewContact = (event) => {
    event.preventDefault()

    const newContact = {name: newName};

    for(let i=0; i<persons.length; ++i){
      if(persons[i].name === newContact.name){
        window.alert(`${newContact.name} is already added to phonebook`);
        setNewName('');
        return;
      }
    }

    setPersons(persons.concat({name: newName}))
    setNewName('');
  }

  const changeName = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNewContact}>
        <div>
          name: <input onChange={changeName} value={newName}/>
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
