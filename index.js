const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'BSC' },
    { id: 2, name: 'MSC' },
    { id: 3, name: 'Bcom' },
    { id: 4, name: 'Mcom' }];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.filter(i => i.id === parseInt(req.params.id))[0];

    if (!course) return res.status(404).send(`Course not available to given id: ${req.params.id}`);
    res.send(course)
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const existing = courses.filter(i => i.id === parseInt(req.params.id))[0];

    if (!existing) return res.status(404).send(`Course not available to given id: ${req.params.id}`)

    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(result.error.details[0].message);

    existing.name = req.body.name;

    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const existing = courses.find(i => i.id === parseInt(req.params.id));

    if (!existing) {
        return res.status(404).send(`Course not available to given id: ${req.params.id}`)
    }
    courses.splice(courses.indexOf(existing));
    res.send(existing);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log('Listening on port 3000...'))