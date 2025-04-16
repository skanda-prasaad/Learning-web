// sum : 

function sum(a,b){
    return parseInt(a) + parseInt(b);
}

// console.log(sum(1,2));

//  file :

// const fs = require("fs");

// function read(err, data){
//     console.log(data);
// }
// const contents = fs.readFile("a.txt","utf-8", read); // Async
// const contents2 = fs.readFile("b.txt", "utf-8", read); // Async
// console.log("Done");

// Async :

function timeout(){
    console.log("Click");
}
console.log("Hi");
setTimeout(timeout , 1000);
console.log("WElcome");
let c = 0;
for(let i = 1 ; i < 1000000000; i++){
    c += i;
}
console.log("End");


