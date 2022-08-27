exports.conditionOperators = {
   $eq: (arr, field, value) => {
      return arr.filter((item) => item[field] === value);
   },
   $ne: (arr, field, value) => {
      return arr.filter((item) => item[field] !== value);
   },
   $gt: (arr, field, value) => {
      return arr.filter((item) => item[field] > value);
   },
   $gte: (arr, field, value) => {
      return arr.filter((item) => item[field] >= value);
   },
   $lt: (arr, field, value) => {
      return arr.filter((item) => item[field] < value);
   },
   $lte: (arr, field, value) => {
      return arr.filter((item) => item[field] <= value);
   },
};
