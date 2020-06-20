import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const addContact = (newContact) => {
  return axios
    .post(baseUrl, newContact)
    .then(response => response.data);
}

const getAllContacts = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data);
}

const deleteContact = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data);
}

export default { addContact, getAllContacts, deleteContact }