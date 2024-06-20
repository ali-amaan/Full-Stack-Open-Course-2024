import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  // Handles the input change event and updates newName state
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Handles the input change event and updates newNumber state
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter persons array based on searchTerm (case insensitive)
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handles the form submission event
  const addPerson = (event) => {
    // Prevent the default action of form submission
    event.preventDefault();

    // Check if the new name already exists in the persons array
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // Create a new person object with the current newName value
    const newPerson = { 
      name: newName,
      number: newNumber,
    };

    // Update the persons state to include the new person
    setPersons(persons.concat(newPerson));

    // Reset the input field to an empty string
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with: <input value={searchTerm} onChange={handleSearch} />
      </div>

      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App