const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.MONGODB_URL;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

// Transform the returned document to remove `_id` and `__v`, and replace `_id` with `id`
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
