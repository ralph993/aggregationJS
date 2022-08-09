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
		return arr.slice(0, query["$count"]);
	},
	$skip: (arr, query) => {
		return arr.slice(query["$count"]);
	},
};

exports.aggregate = (arr, pipeline) => {
	if (!Array.isArray(pipeline)) throw new Error("Pipeline must be an array");
	if (!pipeline.length) throw new Error("Pipeline must contain at least one operator");
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
