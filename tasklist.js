const express= require ("express");
const app = express();
const port = 3000;


const taskList = [
    {
        id:1,
        taskName:"Go to the supermarket",
        description: "buy: eggs, rice, oil",
        state: true,
    },
    {
        id:2,
        taskName:"Study for the exam",
        description: "History of the French revolution",
        state: false,
    },
    {
        id:3,
        taskName:"Send an email",
        description: "Mr.Thompson",
        state: true,
    }
];

app.get("/tasks",(req,res)=>{
    res.setHeader ("Content-Type", "application/json");
    res.status(200).json(taskList);
}); 

app.listen (port , () => {
    console.log("Servidor funcionando en:", port);
});
