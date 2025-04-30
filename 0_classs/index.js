class Rectangle{
    constructor(innerWidth, innerHeight, color){
        this.width = innerWidth;
        this.height = innerHeight;
        this.color = color;
    }
    area(){
        return this.width * this.height;
    }
    print(){
        console.log(`Color of rectangle is ${this.color}`);
    }
}

const rect = new Rectangle(10, 20, "Red");
const area = rect.area();
// console.log(area);
// rect.print();

let promise = new Promise(function(resolve, reject){
    setTimeout(function(){
       console.log("Done after 2 sec");
    },2000)
})

promise.then(
    function result(){
        return result;
    }
)

// const date = new Date();
// console.log(date.toISOString());

const map = new Map();
map.set('name', 'Alex');
map.set('age', 20);
console.log(map.get('name'));




