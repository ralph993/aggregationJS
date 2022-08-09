# Aggregation js

### Inspired by mongodb aggregation framework, aggregationjs its lightweight and easy tool to manipulate data.

## Installation

```
 npm i aggregationjs

```

## Pipeline operators

-   [$match](#$match)
-   [$format](#$format)
-   [$groupBy](#$groupBy)
-   [$sort](#$sort)
-   [$limit](#$limit)
-   [$skip](#$skip)

#### Examples

```js
const users = [
	{
		id: 1,
		name: "John",
		age: 20,
	},
	{
		id: 2,
		name: "Bill",
		age: 35,
	},
	{
		id: 3,
		name: "Mary",
		age: 40,
	},
	{
		id: 4,
		name: "Jane",
		age: 35,
	},
];
const res = aggregate(users, [
	{
		$match: {
			age: 35,
		},
	},
]);

// console.log(res) => [ { id: 2, name: "Bill", age: 35}, {id: 4, name: "Jane", age: 35} ]
```
