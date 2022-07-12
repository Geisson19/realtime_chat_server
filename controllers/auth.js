const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

/**
 * It creates a new user and returns a token
 * @param req - The request object.
 * @param [res] - The response object.
 * @returns The user is being returned.
 */
const createUser = async (req, res = response) => {
	try {
		const existingUser = await User.findOne({ email: req.body.email });

		if (existingUser) {
			return res.status(400).json({
				ok: false,
				msg: 'Invalid credentials',
			});
		}
	} catch (error) {
		return res.status(400).json({
			ok: false,
			msg: 'Error creating user',
			error,
		});
	}
	const user = new User(req.body);

	// Encrypt password
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = await generateJWT(user.id);

	res.json({
		ok: true,
		message: user,
		token,
	});
};

/**
 * If the user exists, check if the password is valid and returns a token if it is
 * @param req - The request object.
 * @param [res] - The response object.
 * @returns The user is being returned.
 */
const loginUser = async (req, res = response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({
			ok: false,
			msg: 'Invalid credentials',
		});
	} else {
		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Invalid credentials',
			});
		}

		const token = await generateJWT(user.id);

		res.json({
			ok: true,
			message: user,
			token,
		});
	}
};

/**
 * It takes a user id, generates a new token, and returns it
 * @param req - The request object.
 * @param [res] - The response object that will be sent back to the client.
 */
const renewToken = async (req, res = response) => {
	const { uid } = req;

	const user = await User.findById(uid);
	const token = await generateJWT(uid);

	res.json({
		ok: true,
		user,
		token,
	});
};

module.exports = { createUser, loginUser, renewToken };
