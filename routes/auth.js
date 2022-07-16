/*
    * Path *
    /api/auth/
*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/fields_validator');
const validateJWT = require('../middlewares/validate_jwt');

const router = Router();

/* Creating a route for the signup page. */
router.post(
	'/signup',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is not valid').isEmail().normalizeEmail(),
		check('password', 'Password must be at least 6 characters')
			.trim()
			.isLength({
				min: 6,
			}),

		validateFields,
	],
	createUser
);

/* This is a route for the login page. */
router.post(
	'/login',
	[
		check('email', 'Email is not valid').isEmail().normalizeEmail(),
		check('password', 'Password must be at least 6 characters')
			.trim()
			.isLength({
				min: 6,
			}),
		validateFields,
	],
	loginUser
);

/* This is a route for renewing the token. */
router.get('/', validateJWT, renewToken);

// Exporting the router
module.exports = router;
