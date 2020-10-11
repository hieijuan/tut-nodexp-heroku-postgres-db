require('dotenv').config();
const express = require('express');
const Lessons = require('./models/dbHelpers')

const server = express();

server.use(express.json());

const port = process.env.PORT || 5000;

server.get('/', (req, res) => {
    res.json({ message : "Any text will do!"});
});

server.post('/api/lessons', (req, res) => {
    Lessons.add(req.body)
        .then(lesson => {
            res.status(200).json(lesson);
        })
        .catch(error => {
            res.status(500).json({ message : "cannot add lesson" });
        })
});

server.get('/api/lessons', (req, res) => {
    Lessons.find()
        .then(lessons => {
            res.status(200).json(lessons);
        })
        .catch(error => {
            res.status(500).json({ message : "unable to retrieve lessons" });
        })
});

server.get('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    Lessons.findById(id)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({ message : "Record not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message : "unable to delete" });
        })
});

server.delete('/api/lessons/:id', (req, res) => {
    const { id } = req.params;

    Lessons.remove(id)
            .then(count => {
                if (count >= 0) {
                    res.status(200).json({ message : 'Successfully deleted' });
                } else {
                    res.status(404).json ({ message : 'Unable to locate record'});
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'Unable to delete'})
            })
});

server.listen(port, () => {
    console.log(`\n*** Server Running on ${port} ***`);
});