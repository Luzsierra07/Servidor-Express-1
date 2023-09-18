const express= require ("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const listViewRouter = require ("./list-view-router");
const listeditRouter = require ("./list-edit-router");
const taskList = require("./task-data");
const user = require("./user-data");

const jwtSecret = process.env.JWT_SECRET;

app.all ("/*", (req, res, next) => {
    const valideMethods =["GET", "POST", "PUT"];
    if (!valideMethods.includes(req.method)){
        return res.status(405).json({error:"Metodo no permitido"});
    }
    next();
});

app.post("/login", (req, res)=> {
    res.setHeader ("Content-Type", "application/json");
    res.status(200).json(user);
    const { username, password} = req.body;
    if (username === "usuario" && password === "contrasena"){
        const user ={
            id:1,
            username: "usuario",
        };
        const token = jwt.sign(user, jwtSecret, {expiresIn: "1h"});
        res.json({token});
    } else {
        res.status(401).json({error: "Credenciales incorrectas"});
    }
});

app.get("/tasks",(req,res)=>{
    res.setHeader ("Content-Type", "application/json");
    res.status(200).json(taskList);
}); 

app.use(express.json());
app.use("/list-view", listViewRouter);
app.use("/list-edit",listeditRouter);



app.listen (port , () => {
    console.log("Servidor funcionando en:", port);
});

module.exports = taskList;