/*hoisting works with function declaration*/
multiplyNumbers(2, 30);
/*hoisting doesn't work with function expression*/
multiplyTwoNums(5, 10);

/*function declaration*/
function multiplyNumbers(a, b) {
  console.log(a * b);
}
/*function expression*/
const multiplyTwoNums = function () {
  console.log(a * b);
};
