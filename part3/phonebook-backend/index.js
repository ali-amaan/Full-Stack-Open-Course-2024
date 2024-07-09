require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const Person = require('./models/person'); // Import the Person model
// Error handling middleware
const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

// Use the error handling middleware
app.use(errorHandler);
app.use(cors())
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('dist'))

// Custom token to log request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Use Morgan middleware with the custom format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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

const generateId = () => {
    return Math.floor(Math.random() * 1000000).toString();
};

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

// app.get('/', (req, res) => {
//     res.send('<h1>Phonebook Backend</h1>');
// });

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        const currentDate = new Date();
        res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${currentDate}</p>
      `);
    }).catch(error => next(error));
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then((person) => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).send({ error: 'Person not found' });
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end();
    }).catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        });
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     });
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        res.json(savedPerson);
    }).catch(error => {
        console.error('Error saving person:', error);
        res.status(500).send({ error: 'Error saving person' });
    });
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
        .catch(error => next(error));
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
