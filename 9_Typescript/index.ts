// let x: number = 1;
// console.log(x);

function Greeting(name: string) {
  console.log("Hello " + name);
}
Greeting("Alex");

function delayedCall(fn: () => void){
    setTimeout(fn, 1000);
}

delayedCall(function(){
    console.log("hello");
})