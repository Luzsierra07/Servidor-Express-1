const express = require("express");
const listEditRouter = express.Router();
const taskList = require("./task-data");



listEditRouter.post("/create-task", (req, res) => {
    const {taskName, description, state} = req.body
    const newTaskId = taskList.length + 1;

    const newTask = {
      id: newTaskId,
      taskName,
      description,
      state,
    }

    taskList.push(newTask);
    res.json(newTask);
  });

  listEditRouter.delete("/delete-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskList.findIndex((task) => task.id === taskId);
    if (taskIndex === -1){
      return res.status(404).json({message: "Tarea no encontrada"});
    };
    taskList.splice(taskIndex, 1);
    res.json({message: "Tarea eliminada con exito"});
  });

  listEditRouter.put("/update-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTaskData = req.body;

    const taskToUpdate = taskList.find((task) => task.id === taskId);
    if (!taskToUpdate) {
      return res.status(400).json({error: "Tarea no encontrada"});
    };

    taskToUpdate.taskName = updatedTaskData.taskName || taskToUpdate.taskName;
    taskToUpdate.description = updatedTaskData.description || taskToUpdate.description;
    taskToUpdate.state = updatedTaskData.state || taskToUpdate.state;

    res.json(taskToUpdate);
  });
  
  module.exports = listEditRouter;
 
  

  
  
  
  
  