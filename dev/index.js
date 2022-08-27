const { aggregate } = require("../src/index");
const users = require("../users.json");

const result = aggregate(users, [
   {
      $match: {
         id: { $gt: 9 },
      },
   },
]);

console.log(result);
