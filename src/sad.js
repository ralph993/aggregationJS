const { aggregate } = require("./index");

const users = [
   { name: "John", age: 10, city: "New York" },
   { name: "Jane", age: 40, city: "New York" },
   { name: "Joe", age: 30, city: "New York" },
   { name: "Jack", age: 50, city: "New York" },
];

const result = aggregate(users, [
   {
      $math: {
         $avg: {
            age: 1,
         },
      },
   },
]);

console.log(result);
