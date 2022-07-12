const { validationResult } = require('express-validator');

/**
 * If there are errors, return a 400 response with the errors. Otherwise, call the next function
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns An array of errors.
 */
const validateFields = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ ok: false, errors: errors.array() });
	}

	next();
};

module.exports = { validateFields };
