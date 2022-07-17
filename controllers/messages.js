const Message = require('../models/message');

const getMessagesFrom = (req, res) => {
	const myId = req.uid;
	const messageFrom = req.params.from;

	res.json({
		ok: true,
		message: 'hola',
	});
};

module.exports = { getMessagesFrom };
