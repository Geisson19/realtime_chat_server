const { response } = require('express');
const jwt = require('jsonwebtoken');

/**
 * It checks if the request has a token, if it does, it verifies it and if it's valid, it adds the user
 * to the request object
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a callback function that will be called when the middleware is done.
 * @returns The token is being returned.
 */
const validateJWT = (req, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No token provided',
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRET_JWT);
		req.uid = uid;
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid token',
		});
	}
};

module.exports = validateJWT;
