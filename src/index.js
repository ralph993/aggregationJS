const mathOperations = {
  $sum: (arr, field) => {
    return arr.reduce((acc, item) => acc + item[field], 0);
  },
  $avg: (arr, field) => {
    return mathOperations.$sum(arr, field) / arr.length;
  },
  $min: (arr, field) => {
    return arr.reduce(
      (acc, item) => (item[field] < acc ? item[field] : acc),
      arr[0][field]
    );
  },
  $max: (arr, field) => {
    return arr.reduce(
      (acc, item) => (item[field] > acc ? item[field] : acc),
      arr[0][field]
    );
  },
};

const operatorsHandlers = {
  $match: (arr, query) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (
        Object.keys(query).every((key) => {
          if (key.includes(".")) {
            const [...keys] = key.split(".");
            const nestedItem = keys.reduce((acc, key) => acc[key], item);
            return nestedItem === query[key];
          } else {
            return item[key] === query[key];
          }
        })
      ) {
        result.push(item);
      }
    }

    return result;
  },
  $format: (arr, query) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      let obj = {};
      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
          obj[key] = item[key];
        }
      }
      result.push(obj);
    }

    return result;
  },
  $groupBy: (arr, query) => {
    let result = {};

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const key = Object.keys(query)[0];
      const value = item[key];
      if (!result[value]) {
        result[value] = [];
      }
      result[value].push(item);
    }

    return result;
  },
  $sort: (arr, query) => {
    return arr.sort((a, b) => {
      const key = Object.keys(query)[0];
      const value = query[key];
      if (value === 1) {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
  },
  $limit: (arr, query) => {
    return arr.slice(0, query["$count"]);
  },
  $skip: (arr, query) => {
    return arr.slice(query["$count"]);
  },
  $unwind: (arr, query) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const path = query["$path"];
      for (let j = 0; j < item[path].length; j++) {
        result.push({
          ...item,
          [path]: item[path][j],
        });
      }
    }

    return result;
  },
  $math: (arr, query) => {
    const operation = Object.keys(query)[0];
    const field = Object.keys(query[operation])[0];
    return mathOperations[operation](arr, field);
  },
  $remove: (arr, query) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (
        Object.keys(query).every((key) => {
          if (key.includes(".")) {
            const [...keys] = key.split(".");
            const nestedItem = keys.reduce((acc, key) => acc[key], item);
            return nestedItem === query[key];
          } else {
            return item[key] === query[key];
          }
        })
      ) {
        continue;
      } else {
        result.push(item);
      }
    }

    return result;
  },
};

exports.aggregate = (arr, pipeline) => {
  if (!Array.isArray(pipeline)) throw new Error("Pipeline must be an array");
  if (!pipeline.length)
    throw new Error("Pipeline must contain at least one operator");
  // check if all operators are valid
  for (let i = 0; i < pipeline.length; i++) {
    const operator = pipeline[i];
    if (!Object.keys(operatorsHandlers).includes(Object.keys(operator)[0])) {
      throw new Error(`Operator ${Object.keys(operator)[0]} is not valid`);
    }
  }

  const [...operators] = pipeline;

  return operators.reduce((acc, operator) => {
    const [key, value] = Object.entries(operator)[0];
    return operatorsHandlers[key](acc, value);
  }, arr);
};
