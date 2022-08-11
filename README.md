# Aggregation JS

Inspired by mongodb aggregation framework, aggregationjs its a lightweight and easy tool to manipulate data.

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
- [$unwind](#unwind)
- [$math](#math)
- [$remove](#remove)
- [Multiple pipeline](#multiple-pipeline)

## Usage

```js
const { aggregate } = require("aggregationjs");
const res = aggregate(data, pipeline);

// ES6
import { aggregate } from "aggregationjs";
```

## $match

Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.

```js
const data = [
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "joe", age: 35 },
  { id: 4, name: "Dean", age: 40 },
];

const res = aggregate(data, [{ $match: { age: 35 } }]);

(res) => [
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "joe", age: 35 },
];
```

## $groupBy \*

Groups the elements of the calling array according to the string values returned by a provided testing function. The returned object has separate properties for each group, containing arrays with the elements in the group.

```js
const data = [
 { id: 1, name: "Jane", age: 20 },
 { id: 2, name: "Bill", age: 35 },
 { id: 3, name: "joe", age: 35 },
 { id: 4, name: "Dean", age: 40 },
]

const res = aggregate(data, [{ $groupBy: { age: 1 } }]);

res => {
  '20': [ { id: 1, name: 'Jane', age: 20 } ],
  '35': [
    { id: 2, name: 'Bill', age: 35 },
    { id: 3, name: 'joe', age: 35 }
  ],
  '40': [ { id: 4, name: 'Dean', age: 40 } ]
}
```

## $sort

Sorts all input documents and returns them to the pipeline in sorted order.

```js
const data = [
  { id: 4, name: "Dean", age: 40 },
  { id: 3, name: "joe", age: 35 },
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
];

const res = aggregate(data, [{ $sort: { age: 1 } }]);

(res) => [
  { id: 1, name: "Jane", age: 20 },
  { id: 3, name: "joe", age: 35 },
  { id: 2, name: "Bill", age: 35 },
  { id: 4, name: "Dean", age: 40 },
];
```

## $limit

Limits the number of documents passed to the next stage in the pipeline.

```js
const data = [
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "joe", age: 35 },
  { id: 4, name: "Dean", age: 40 },
];

const res = aggregate(data, [{ $limit: { $count: 1 } }]);

(res) => [{ id: 1, name: "Jane", age: 20 }];
```

## $skip

Skips over the specified number of documents that pass into the stage and passes the remaining documents to the next stage in the pipeline.

```js
const data = [
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "joe", age: 35 },
  { id: 4, name: "Dean", age: 40 },
];

const res = aggregate(data, [{ $skip: { $count: 1 } }]);

(res) => [
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "joe", age: 35 },
  { id: 4, name: "Dean", age: 40 },
];
```

## $format \*

Passes along the documents with the requested fields to the next stage in the pipeline

```js
const data = [
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "joe", age: 35 },
  { id: 4, name: "Dean", age: 40 },
];

const res = aggregate(data, [{ $format: { age: 1, name: 1 } }]);

(res) => [
  { age: 20, name: "Jane" },
  { age: 35, name: "Bill" },
  { age: 35, name: "Jane" },
  { age: 40, name: "Dean" },
];
```

## $unwind

Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.

```js
const actors = [
  {
    id: 1,
    name: "John",
    age: 30,
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
  },
];

const res = aggregate(data, [{ $unwind: { $path: "movies" } }]);

(res) => [
  {
    id: 1,
    name: "John",
    age: 30,
    movies: { id: 1, name: "The Shawshank Redemption", year: 1994 },
  },
  {
    id: 1,
    name: "John",
    age: 30,
    movies: { id: 2, name: "The Godfather", year: 1972 },
  },
  {
    id: 1,
    name: "John",
    age: 30,
    movies: { id: 3, name: "The Godfather: Part II", year: 1974 },
  },
];
```

## $remove \*

Remove all element from an document that match the expression.

```js
const data = [
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
  { id: 3, name: "joe", age: 35 },
  { id: 4, name: "Dean", age: 40 },
];

const res = aggregate(data, [{ $remove: { id: 1 } }]);

(res) => [
  { id: 4, name: "Dean", age: 40 },
  { id: 3, name: "Jane", age: 35 },
  { id: 2, name: "Bill", age: 35 },
];
```

## $math

#### $sum

Calculates and returns the collective sum of numeric values.

```js
const users = [
  { id: 4, name: "Dean", age: 40 },
  { id: 3, name: "Jane", age: 35 },
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
];

const res = aggregate(users, [
  {
    $math: {
      $sum: {
        age: 1,
      },
    },
  },
]);

(res) => 130;
```

#### $avg

Returns the average value of the numeric values.

```js
const users = [
  { id: 4, name: "Dean", age: 40 },
  { id: 3, name: "Jane", age: 35 },
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
];

const res = aggregate(users, [
  {
    $math: {
      $avg: {
        age: 1,
      },
    },
  },
]);

(res) => 35.5;
```

#### $min

Returns the minimum value.

```js
const users = [
  { id: 4, name: "Dean", age: 40 },
  { id: 3, name: "Jane", age: 35 },
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
];

const res = aggregate(users, [
  {
    $math: {
      $min: {
        age: 1,
      },
    },
  },
]);

(res) => 20;
```

#### $max

Returns the maximum value.

```js
const users = [
  { id: 4, name: "Dean", age: 40 },
  { id: 3, name: "Jane", age: 35 },
  { id: 1, name: "Jane", age: 20 },
  { id: 2, name: "Bill", age: 35 },
];

const res = aggregate(users, [
  {
    $math: {
      $avg: {
        age: 1,
      },
    },
  },
]);

(res) => 40;
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, questions or recommendations | ralph93.dev@gmail.com
