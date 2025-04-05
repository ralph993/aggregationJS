const { conditionOperators } = require("./conditionals");
const { mathOperators } = require("./math");

const executeConditionOperators = (arr, query) => {
	const [field, obj] = Object?.entries(query)[0];
	if (typeof obj !== "object") return false;
	const [operator, value] = Object?.entries(obj)[0];
	return conditionOperators[operator](arr, field, value);
};

exports.mainOperators = {
	$match: (arr, query) => {
		// checl for condition operators
		const conditionOperator = executeConditionOperators(arr, query);
		if (!!conditionOperator || !!conditionOperator?.length) return conditionOperator;

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
		return mathOperators[operation](arr, field);
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
	$concatArrays: (arr, query) => {
		let result = [];
		const fields = query["$fields"];
		const as = query["$as"];

		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];

			for (let j = 0; j < fields.length; j++) {
				const field = fields[j];
				if (j === 0) {
					result.push({
						...item,
						[as]: item[field],
					});
				} else {
					result[i][as] = result[i][as].concat(item[field]);
				}
			}
		}

		return result;
	},
	$push: (arr, query) => {
		let result = [];

		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			const field = Object.keys(query)[0];

			if (field.includes(".")) {
				const [...keys] = field.split(".");
				const nestedItem = keys.reduce((acc, key) => acc[key], item);
				nestedItem.push(query[field]);
			} else {
				item[field].push(query[field]);
			}
			result.push(item);
		}

		return result;
	},
};
