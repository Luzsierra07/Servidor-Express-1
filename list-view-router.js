const express = require ("express");
const listViewRouter = express.Router();
const taskList = require("./task-data");

function validateParams(req, res, next){
  const {id} = req.params;
  if (!id || isNaN(parseInt(id))){
    return res.status(400).json({ error: "El parametro id es invalido"});
  }
  next();
}

listViewRouter.get("/completed-tasks", (req, res) => {
    const completedTasks = taskList.filter((task) => task.state === true);
    res.json(completedTasks);
  });
  
listViewRouter.get("/incomplete-tasks/:id", validateParams, (req, res) => {
  const id = parseInt(req.params.id);
    const incompleteTasks = taskList.filter((task) => task.state === false);
    res.json(incompleteTasks, id);
  });

module.exports = listViewRouter;
