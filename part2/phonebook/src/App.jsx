import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Notification from './components/notification';
import './index.css'; // Import the CSS file


// Component for rendering a single person
const Person = ({ person, onDelete }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => onDelete(person.id)}>delete</button>
  </div>
);

// Component for rendering the list of persons
const PersonList = ({ persons, searchTerm, onDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
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
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: '' });
    }, 5000);
  };

  const addPerson = (newPerson) => {
    const existingPerson = persons.find(person => person.name === newPerson.name);

    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newPerson.number };

        personsService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            showNotification(`Updated ${newPerson.name}'s number`);
          })
          .catch(error => {
            console.error('Error updating person:', error);
            showNotification(`Error updating ${newPerson.name}'s number`, 'error');
          });
      }
    } else {
      const personWithId = { ...newPerson, id: (persons.length + 1).toString() };

      personsService.create(personWithId).then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        showNotification(`Added ${newPerson.name}`);
      }).catch(error => {
        console.error('Error adding person:', error);
        showNotification(`Error adding ${newPerson.name}`, 'error');
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
        showNotification(`Deleted ${person.name}`);
      }).catch(error => {
        console.error('Error deleting person:', error);
        showNotification(`Information of ${person.name} has already been removed from server`, 'error');
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <PersonList persons={persons} searchTerm={searchTerm} onDelete={deletePerson} />
    </div>
  );
};

export default App;