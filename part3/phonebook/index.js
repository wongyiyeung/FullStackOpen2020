const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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

const getRandomId = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

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

app.post('/api/persons', (req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({error: 'object is empty!'})
  }
  const body = req.body

  if(body.name == null) {
    res.status(400).json({error: 'name field is empty!'})
  }
  
  if(body.number == null) {
    res.status(400).json({error: 'number field is empty!'})
  }

  const existingContact = phonebook.find(contact => contact.name === body.name)
  if(existingContact) {
    res.status(400).json({error: 'name must be unique!'})
  }

  const contact = {
    id: getRandomId(1000),
    name: body.name,
    number: body.number
  }

  phonebook = phonebook.concat(contact)
  res.status(200).end()

})

app.delete('/api/persons/:id', (req, res) => {
  phonebook = phonebook.filter(contact => contact.id !== Number(req.params.id))
  res.status(204).end()
})

const PORT = 3001

app.listen(PORT)