// Forma 1 de escrever uma arrow-function
/*
var square = (x) => {
    var result = x * x;
    return result;
};
*/
// Forma 2 de escrever uma arrow-function
// var square = (x) => x * x;

// Forma 3 de escrever uma arrow-function
var square = x => x * x;
console.log(square(9));

var user = {
    name: 'Cadu',
    sayHi: () => {  // Arrow-function no contexto dos elementos do objeto
        console.log(`Hi. I'm ${this.name}`);
        console.log(arguments);
    },
    sayHiAlt () {   // Function no contexto do objeto
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }
}

user.sayHiAlt(1,2,3);