const { operatorsHandlers } = require("./operatorsHandlers");

exports.aggregate = (arr, pipeline) => {
	if (!Array.isArray(pipeline)) throw new Error("Pipeline must be an array");
	if (!pipeline.length) throw new Error("Pipeline must contain at least one operator");
	// check if all operators are valid
	for (let i = 0; i < pipeline.length; i++) {
		const operator = pipeline[i];
		if (!Object.keys(operatorsHandlers).includes(Object.keys(operator)[0])) {
			throw new Error(`${Object.keys(operator)[0]} is not a valid operator`);
		}
	}

	const [...operators] = pipeline;

	return operators.reduce((acc, operator) => {
		const [key, value] = Object.entries(operator)[0];
		return operatorsHandlers[key](acc, value);
	}, arr);
};
