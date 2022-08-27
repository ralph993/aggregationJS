exports.mathOperators = {
   $sum: (arr, field) => {
      return arr.reduce((acc, item) => acc + item[field], 0);
   },
   $avg: (arr, field) => {
      return arr.reduce((acc, item) => acc + item[field], 0) / arr.length;
   },
   $min: (arr, field) => {
      return arr.reduce((acc, item) => (item[field] < acc ? item[field] : acc), arr[0][field]);
   },
   $max: (arr, field) => {
      return arr.reduce((acc, item) => (item[field] > acc ? item[field] : acc), arr[0][field]);
   },
};
