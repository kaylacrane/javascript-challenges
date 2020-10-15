// /*hoisting works with function declaration*/
// multiplyNumbers(2, 30);
// /*hoisting doesn't work with function expression*/
// multiplyTwoNums(5, 10);

// /*function declaration*/
// function multiplyNumbers(a, b) {
//   console.log(a * b);
// }
// /*function expression*/
// const multiplyTwoNums = function () {
//   console.log(a * b);
// };

const person = {
  first: "Jill",
  last: "Howlett",
  birthYear: 2000,
  calculateAge(currentYear) {
    console.log(currentYear - this.birthYear);
  },
  get wholeName() {
    console.log(`${this.first} ${this.last}`);
  },
  set wholeName(newValue) {
    const parts = newValue.split(" ");
    this.first = parts[0];
    this.last = parts[1];
  },
};
/* object method*/
person.calculateAge(2020);

/*bind the function*/
function fullName() {
  console.log(`${this.first} ${this.last}`);
}

let displayFull = fullName.bind(person);
displayFull();
console.log(person);

/*getter/setter removes need to put () and allows for updating*/
console.log(person);
person.wholeName;
person.wholeName = "Kayla Crane";
console.log(person);
