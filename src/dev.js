const { aggregate } = require("./index");

const users = [
  { id: 4, name: "Dean", age: 40 },
  { id: 3, name: "Jane", age: 35 },
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
];

const actors = [
  {
    id: 1,
    name: "John",
    age: 30,
    address: {
      cities: ["New York", "Boston"],
    },
    movies: [
      {
        id: 1,
        name: "The Shawshank Redemption",
        year: 1994,
      },
      {
        id: 2,
        name: "The Godfather",
        year: 1972,
      },
      {
        id: 3,
        name: "The Godfather: Part II",
        year: 1974,
      },
    ],
    awards: [
      {
        id: 1,
        name: "Oscar",
        year: 1994,
      },
      {
        id: 2,
        name: "Golden Globe",
        year: 1994,
      },
    ],
  },
];

const result = aggregate(users, [
  {
    $match: {
      age: {
        $gte: 28,
      },
    },
  },
]);

console.log(result);
