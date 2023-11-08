const express = require('express');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("./db");

ideasRouter = express.Router();


// GET /api/ideas to get an array of all ideas.
// POST /api/ideas to create a new idea and save it to the database.
// GET /api/ideas/:ideaId to get a single idea by id.
// PUT /api/ideas/:ideaId to update a single idea by id.
// DELETE /api/ideas/:ideaId to delete a single idea by id.

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }

})

const validateIdeaData = (req, res, next) => {
    const {id, name, description,numWeeks, weeklyRevenue } = req.body
    if(!name || !description || !numWeeks || !weeklyRevenue) {
        res.status(400).send('Idea data is missing')
    }
    else if(req.method == 'PUT') {
        if(!id || !name || !description || !numWeeks || !weeklyRevenue) {
            res.status(400).send('Idea id data is missing')
        }
        else next();
    }
    else next();
}

ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideaId', (req, res) => {
    res.send(req.idea);
})

ideasRouter.post('/',validateIdeaData, checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

ideasRouter.put('/:ideaId',validateIdeaData, checkMillionDollarIdea, (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
})

ideasRouter.delete('/:ideaId', (req, res) => {
    deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send('Deleted');
})

module.exports = ideasRouter