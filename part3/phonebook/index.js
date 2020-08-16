const express = require('express')
const app = express()

let phonebook = 
[
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.status(200).json(phonebook)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length}</p><p>${Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const contact = phonebook.find( contact => contact.id === Number(req.params.id))
  if(contact) {
    res.status(200).json(contact)
  }
  else {
    res.status(404).end()
  }
})

const PORT = 3001

app.listen(PORT)