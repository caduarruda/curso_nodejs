// var obj = {
//     name: 'Cadu'
// };

// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log( stringObj );

var personString = '{"name": "Cadu", "age": 45}';
var person = JSON.parse(personString);
console.log(typeof person);
console.log(person);