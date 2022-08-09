# Aggregation JS

Inspired by mongodb aggregation framework, aggregationjs its lightweight and easy tool to manipulate data.

## Installation

```bash
npm install aggregationjs 
```

## Pipelines operators
- [$match](#match)
- [$groupBy](#groupby)
- [$sort](#sort)
- [$limit](#limit)
- [$skip](#skip)
- [$format](#format)
- [Multiple pipeline](#multiple-pipeline)

## Usage
```js
const { aggregate } = require("aggregationjs");
const res = aggregate(data, pipeline)
```

## $match
Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.

```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "Jane", age: 35 },
]

const res = aggregate(data, [
 { $match: { age: 35 } },
]);

res => [
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "Jane", age: 35 },
]
```

## $groupBy
Groups the elements of the calling array according to the string values returned by a provided testing function. The returned object has separate properties for each group, containing arrays with the elements in the group.
```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "Jane", age: 35 },
]

const res = aggregate(data, [
 { $groupBy: { age: 1 } },
]);

res => {
  '20': [ { id: 1, name: 'Jane', age: 20 } ],
  '35': [
    { id: 2, name: 'Bill', age: 35 },
    { id: 3, name: 'Jane', age: 35 },
  ]
}
```

## $sort
Documentation for $sort...
```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "Jane", age: 35 },
]

const res = aggregate(data, [
 { $sort: { age: 1 } },
]);

res => [
  { id: 1, name: 'Jane', age: 20 },
  { id: 2, name: 'Bill', age: 35 },
  { id: 3, name: 'Jane', age: 35 },
]
```

## $limit
Documentation for $limit...
```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "Jane", age: 35 },
]

const res = aggregate(data, [
 { $limit: { $count: 1 } },
]);

res => [ { id: 1, name: 'Jane', age: 20 } ]
```

## $skip
Documentation for $skip...
```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "Jane", age: 35 },
]
const res = aggregate(data, [
 { $skip: { $count: 1 } },
]);

res => [ { id: 2, name: 'Bill', age: 35 }, { id: 3, name: 'Jane', age: 35 } ]
```

## $format
Documentation for $format...
```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "Jane", age: 35 },
]

const res = aggregate(data, [
 { $format: { age: 1, name: 1 } },
]);

res => [
  { age: 20, name: 'Jane' },
  { age: 35, name: 'Bill' },
  { age: 35, name: 'Jane' },
]
```

## Multiple pipeline
```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "Jane", age: 35 },
]
const res = aggregate(data, [
 { $match: { age: 35 } },
 { $format: { age: 1, name: 1 } },
]);

res => [ { age: 35, name: 'Bill' }, { age: 35, name: 'Jane' }, ]
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contact

ralph93.dev@gmail.com
