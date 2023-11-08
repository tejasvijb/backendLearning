const express = require('express');

meetingsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("./db");

// GET /api/meetings to get an array of all meetings.
// POST /api/meetings to create a new meeting and save it to the database.
// DELETE /api/meetings to delete all meetings from the database.

meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
})


meetingsRouter.post('/', (req, res) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
})

meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})
module.exports = meetingsRouter