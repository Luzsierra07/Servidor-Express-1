const express= require ("express");
const app = express();
const port = 3000;
const listViewRouter = require ("./list-view-router");
const listeditRouter = require ("./list-edit-router");
const taskList = require("./task-data");

app.all ("/*", (req, res, next) => {
    const valideMethods = ["GET", "POST", "PUT"];
    if (!valideMethods.includes(req.method)){
        return res.status(405).json({error:"Metodo no permitido"});
    }
    next();
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