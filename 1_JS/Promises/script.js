// /*
//  Promise class give us a promise that it will return you something in future

//  Defining a proise is hard but using is easy; 
// */

// // function promisified(ms){
// //     return new Promise(resolve => setTimeout(resolve, ms));
// //     // return an object of promise
// // }

// // function callback(){
// //     // console.log("3 seconds done");
// // }

// // promisified(3000).then(callback);


// /* 
// function promisified(resolve){
//     setTimeout(resolve, 3000)
// }

// promisified(function(){
//     log("Hi there afte 3s");
// })
// */

// function waitfor3s(resolve){
//     setTimeout(resolve, 3000);
// }
// function promisified(){
//     return new Promise(waitfor3s);
// }
// function main(){
//     console.log("Hi there");
// }

// promisified().then(main);

// /*
//     Promise syas bro i will take one function as an input, whaterver the first argument of that function , whenever that argument (resolve) argument is called i will call whatever passed in .then()
// */
// function random(resolve, reject){ // resolve is also a function
//     setTimeout(resolve, 3000);
// }
// let p = new Promise(random); // supposed to return a something eventually
// // using the promise :
// function callback(){
//     console.log("Succeeded");
// }
// p.then(callback);











const fs = require("fs");

function trimfile(resolve){
    fs.readFile("a.txt", 'utf-8',function(err, data){
        const trimmed = data.trim();
        resolve(trimmed);
    })
}

let cleanfile = new Promise(trimfile); 


cleanfile.then(function (cleanedcontent){
    console.log(cleanedcontent);
})
