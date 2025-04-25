const {Command} = require("commander");
const program = new Command();
const fs = require("fs");
const path = require("path");

const todoFile = path.join(__dirname, "todo.json");

program 
    .name("To do application")
    .description("It will create todo and update or delete the tasks provided to todo application")
    .version("1.0.0")

program
    .command(" add <task>")
    .action((task)=>{
        fs.readFile(todoFile, "utf-8",function(err, data){
            if(err){
                if(err.code === "ENOENT"){
                    const newTask = [{task, completed: false}];
                    fs.writeFile(todoFile, JSON.stringify(newTask, null, 2), (writeErr) => {
                        if(writeErr){
                            console.log("Error writing to the file....");
                        }else{
                            console.log("No existing todo file. Creaed a new one...");
                        }
                    });
                }else{
                    console.log("Errror reading the file...", err);
                }
                return;
            }

            const todos =JSON.parse(data);
            todos.push({task : task, completed : false});
            
            fs.writeFile(todoFile, JSON.stringify(todos, null, 2), (err)=> {
                if(err)
                    console.log("Error writing todo file", err);
                else console.log("Task added succesfullly....");
            })
        })
    })

program.parse();