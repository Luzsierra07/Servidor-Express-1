const express = require ("express");
const listViewRouter = express.Router();
const taskList = require("./task-data");



listViewRouter.get("/completed-tasks", (req, res) => {
    const completedTasks = taskList.filter((task) => task.state === true);
    res.json(completedTasks);
  });
  
listViewRouter.get("/incomplete-tasks", (req, res) => {
    const incompleteTasks = taskList.filter((task) => task.state === false);
    res.json(incompleteTasks);
  });

module.exports = listViewRouter;
