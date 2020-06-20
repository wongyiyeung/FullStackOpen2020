import React from 'react'

const Contact = ({person, deleteContactHandler}) => {
  return (
    <>
      <div>{person.name} {person.number} <button onClick={() => deleteContactHandler(person)}>delete</button></div>
    </>
  )
}

const ContactList = ({contactList, filter, deleteContactHandler}) => {
  const filteredContacts = contactList.filter(person => person.name.slice(0, filter.length).localeCompare(filter, 'en', {sensitivity: 'accent'}) === 0);  
  return (
  <>
    {filteredContacts.map(person => <Contact key={person.name} person={person} deleteContactHandler={deleteContactHandler}/>)}
  </>
  )
}

export default ContactList