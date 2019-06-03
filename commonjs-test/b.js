const { add, multiply} = require("./a");
const _ = require("lodash");

const result = add(5, 6);
const mulResult = multiply(10, 21);
const string = _.join(["Hello", "nodejs"], " ");

console.log(result);
console.log(mulResult);
console.log("string: ", string);