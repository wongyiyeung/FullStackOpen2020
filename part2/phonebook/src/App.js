import React, { useState, useEffect } from 'react'
import phonebook from './services/contacts'
import ContactList from './components/Contact'
import PersonForm from './components/Form'
import Notification from './components/Notification'
import './index.css'

const Filter = ({onChange, value}) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={onChange} value={value}/> 
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilerName ] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);

  useEffect(()=>{
    phonebook
      .getAllContacts()
      .then(allContacts => {
        setPersons(allContacts);
      })
  },[]);

  const sendNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  }

  const sendErrorNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }

  const deleteContact = (person) => {
    if(window.confirm(`Delete ${person.name}?`) === false) return;

    phonebook
      .deleteContact(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        sendNotification(`Deleted ${person.name}`);
      })
  }

  const submitNewContact = (event) => {
    event.preventDefault()

    const newContact = {name: newName, number: newNumber};
    let hasContact = false;

    persons.forEach(p => {
      if (p.name === newContact.name){
        hasContact = true;
        newContact.id = p.id;
        if(window.confirm(`${newContact.name} is already added to phonebook, replace the old number with a new one?`) === false) return;

        phonebook
          .updateContact(newContact)
          .then(newContact => {
            setPersons(persons.map(p => p.name === newContact.name ? newContact : p))
            sendNotification(`Updated ${newContact.name}`);
          })
          .catch(() => {
            sendErrorNotification(`Information of ${newContact.name} has already been removed from server`)
          })
      }
    });

    if(hasContact === false) {
      phonebook
        .addContact(newContact)
        .then(addedContact => {
          setPersons(persons.concat(addedContact));
          sendNotification(`Added ${newContact.name}`);
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
      <Notification message={notificationMessage} errorMessage={errorMessage}/>
      <Filter onChange={changeFilter} value={filterName}/>
      <h2>Add new contact</h2>
      <PersonForm submitHandler={submitNewContact} nameChangeHandler={changeName} numberChangeHandler={changeNumber} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <ContactList contactList={persons} filter={filterName} deleteContactHandler={deleteContact}/>
    </div>
  )
}

export default App
