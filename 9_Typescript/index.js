"use strict";
// let x: number = 1;
// console.log(x);
function Greeting(name) {
    console.log("Hello " + name);
}
Greeting("Alex");
function delayedCall(fn) {
    setTimeout(fn, 1000);
}
delayedCall(function () {
    console.log("hello");
});
