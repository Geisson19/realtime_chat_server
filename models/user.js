const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	isOnline: {
		type: Boolean,
		default: false,
	},
});

/* Override the method that is called when the object is converted to JSON. */
UserSchema.methods.toJSON = function () {
	const { __v, _id, isOnline, password, ...object } = this.toObject();
	object.uid = _id;
	return object;
};

module.exports = model('User', UserSchema);
