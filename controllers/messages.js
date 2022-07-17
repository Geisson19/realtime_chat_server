const Message = require('../models/message');

const getMessagesFrom = (req, res) => {
	const myId = req.uid;
	const from = req.params.from;

	const last30messages = Message.find({
		$or: [
			{ from: myId, to: from },
			{ from: from, to: myId },
		],
	})
		.sort({ createdAt: 1 })
		.limit(30);

	res.json({
		ok: true,
		messages: last30messages,
	});
};

module.exports = { getMessagesFrom };
