const minionRouter = require("express").Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("./db");

// GET /api/minions to get an array of all minions.
// POST /api/minions to create a new minion and save it to the database.
// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.

minionRouter.param("minionId", (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send("id not found");
    }
})

const validateMinionData = (req, res, next) => {

    const name = req.body.name;
    const title = req.body.title;
    const weaknesses = req.body.weaknesses;
    const salary = req.body.salary;
    const id = req.body.id;

    if(req.method == "PUT") {
        if(!id || !name || !title || !weaknesses || !salary) 
        res.status(400).send("One or more property missing in body");
    }

    if(!name || !title || !weaknesses || !salary) {
        res.status(400).send("One or more property missing in body");
    }

}


minionRouter.get("/", (req, res, next) => {
    res.status(200).send(getAllFromDatabase('minions'));
});

minionRouter.post("/", validateMinionData, (req, res, next) => {

    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);

})

minionRouter.get("/:minionId", (req, res, next) => {
    res.status(200).send(req.minion);
})

//validate body is not done for put
minionRouter.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
});

minionRouter.delete("/:minionId", (req, res, next) => {
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send("Deleted");
})

module.exports = minionRouter;
