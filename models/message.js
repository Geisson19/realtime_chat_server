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

/* Override the method that is called when the object is converted to JSON. */
MessageSchema.methods.toJSON = function () {
	const { __v, _id, ...object } = this.toObject();
	return object;
};

module.exports = model('Message', MessageSchema);
