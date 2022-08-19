// execute test for all operations
const { aggregate } = require("../src/index");
const users = require("../users.json");

const operations = [
  {
    operator: "$match",
    query: {
      name: "Glenna Reichert",
    },
    result: [
      {
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        email: "Chaim_McDermott@dana.io",
        address: {
          street: "Dayna Park",
          suite: "Suite 449",
          city: "Bartholomebury",
          zipcode: "76495-3109",
          geo: {
            lat: "24.6463",
            lng: "-168.8889",
          },
        },
        phone: "(775)976-6794 x41206",
        website: "conrad.com",
        company: {
          name: "Yost and Sons",
          catchPhrase: "Switchable contextually-based project",
          bs: "aggregate real-time technologies",
        },
      },
    ],
  },
  {
    operator: "$format",
    query: {
      name: 1,
    },
    result: users.map((user) => ({
      name: user.name,
    })),
  },
  {
    operator: "$groupBy",
    query: {
      name: 1,
    },
    result: users.reduce((acc, user) => {
      const key = user.name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(user);
      return acc;
    }, {}),
  },
  {
    operator: "$sort",
    query: {
      id: 1,
    },
    result: users.sort((a, b) => a.id - b.id),
  },
  {
    operator: "$limit",
    query: {
      $count: 1,
    },
    result: users.slice(0, 1),
  },
  {
    operator: "$skip",
    query: {
      $count: 1,
    },
    result: users.slice(1),
  },
  {
    operator: "$remove",
    query: {
      id: 9,
    },
    result: users.filter((user) => user.id !== 9),
  },
];

for (let i = 0; i < operations.length; i++) {
  const { operator, query, result } = operations[i];
  const actual = aggregate(users, [{ [operator]: query }]);

  test(operator, () => {
    expect(actual).toEqual(result);
  });
}
