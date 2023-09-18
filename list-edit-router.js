const express = require("express");
const jwt = require("jsonwebtoken");
const listEditRouter = express.Router();
const taskList = require("./task-data");

function authenticateToken (req,res,next) { 
  const token = req.header("Authorization");
  if(!token) return res.status(403).json({ error: "Acceso no autorizado"});

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({error: "Token no válido"});
    req.user = user;
    next();
  });
}

listEditRouter.get("/protected-route", authenticateToken, (req, res)=> {
  const userId = req.user.id;
  const username = req.user.username;
  res.json({message:"Ruta protegida", userId,username});
});

function handleErrors(req, res, next){
  if (req.method === "POST" && Object.keys(req.body).lengt === 0){
    return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío"});
  }

  if (req.method === "POST"){
    const {taskName, description, state} = req.body;
    if (!taskName || !description || !state){
      return res.status(400).json({ error: "Faltan atributos para crear la tarea"});
    }
  }

  if (req.method === "PUT" &&  Object.keys(req.body).lengt === 0){
    return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
  }

  if (req.method === "PUT") {
    const { taskName, description, state } = req.body;
    if (!taskName && !description && !state) {
      return res.status(400).json({ error: "No se proporcionó información válida para actualizar la tarea" });
    }
  }
  next();
}

listEditRouter.use(handleErrors);

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
 
  

  
  
  
  
  