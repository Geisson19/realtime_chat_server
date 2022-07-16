const { response } = require('express');
const User = require('../models/user');

const getAllUsers = async (req, res = response) => {
	const since = Number(req.query.since || 0);

	const users = await User.find({
		_id: { $ne: req.uid },
	})
		.sort('-isOnline')
		.skip(since)
		.limit(20);

	res.status(200).json({
		ok: true,
		users,
	});
};

module.exports = { getAllUsers };
