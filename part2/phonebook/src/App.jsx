import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component for rendering a single person
const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

// Component for rendering the list of persons
const PersonList = ({ persons, searchTerm }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

// Component for the form
const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    addPerson({ name: newName, number: newNumber });
    setNewName('');
    setNewNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addPerson = (newPerson) => {
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    const personWithId = { ...newPerson, id: persons.length + 1 };

    axios
      .post('http://localhost:3001/persons', personWithId)
      .then((response) => {
        setPersons([...persons, response.data]);
      })
      .catch((error) => {
        console.error('Error adding person:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={searchTerm} onChange={handleSearch} />
      </div>
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <PersonList persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;