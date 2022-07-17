const Message = require('../models/message');

const getMessagesFrom = async (req, res) => {
	const myId = req.uid;
	const from = req.params.from;

	const last30messages = await Message.find({
		$or: [
			{ from: myId, to: from },
			{ from: from, to: myId },
		],
	})
		.sort({ createdAt: 'desc' })
		.limit(30);

	res.json({
		ok: true,
		messages: last30messages,
	});
};

module.exports = { getMessagesFrom };
