const jwt = require('jsonwebtoken');

/**
 * It takes a user id, creates a JWT payload with that id, signs the payload with a secret key, and
 * returns a promise that resolves with the JWT token
 * @returns A promise that resolves to a token
 */
const generateJWT = uid => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			process.env.SECRET_JWT,
			{
				expiresIn: '24h',
			},
			(err, token) => {
				if (err) {
					reject(`Something happened while creating JWT ${err}`);
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = { generateJWT };
