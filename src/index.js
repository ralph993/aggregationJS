const operatorsList = {
	$match: (arr, query) => {
		let result = [];

		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];

			if (Object.keys(query).every((key) => item[key] === query[key])) {
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
					obj[key] = item[[key]];
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
		return arr.slice(0, query.count);
	},
	$skip: (arr, query) => {
		return arr.slice(query.count);
	},
};

exports.aggregate = (arr, pipeline) => {
	const [...operators] = pipeline;

	return operators.reduce((acc, operator) => {
		const [key, value] = Object.entries(operator)[0];
		return operatorsList[key](acc, value);
	}, arr);
};

const users = [
	{
		_id: 1,
		name: "John",
		age: 20,
	},
	{
		_id: 2,
		name: "Bill",
		age: 30,
	},
	{
		_id: 3,
		name: "Mary",
		age: 40,
	},
	{
		_id: 4,
		name: "Jane",
		age: 30,
	},
];
