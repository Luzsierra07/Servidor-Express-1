const express = require ("express");
const listViewRouter = express.Router();
const jwt = require ("jsonwebtoken");
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

listViewRouter.get("/protected-route", authenticateToken, (req, res)=> {
  const userId = req.user.id;
  const username = req.user.username;
  res.json({message:"Ruta protegida", userId,username});
});



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
