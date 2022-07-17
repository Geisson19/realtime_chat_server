const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
	{
		to: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		from: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model('Message', MessageSchema);
