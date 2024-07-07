const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(morgan('tiny')); // Middleware for logging

const persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

// Custom token to log request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Use Morgan middleware with the custom format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const generateId = () => {
    return Math.floor(Math.random() * 1000000).toString();
};

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>');
});

app.get('/info', (req, res) => {
    const currentDate = new Date();
    const entryCount = persons.length;
    res.send(`
      <p>Phonebook has info for ${entryCount} people</p>
      <p>${currentDate}</p>
    `);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const index = persons.findIndex(p => p.id === id);
    if (index !== -1) {
        persons.splice(index, 1);
        res.status(204).end(); // No content status
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        });
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    };

    persons.push(newPerson);
    res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
