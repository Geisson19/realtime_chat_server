const User = require('../models/user');
const Message = require('../models/message');

const connectedUser = async (uid = '') => {
	const user = await User.findById(uid);
	user.isOnline = true;

	await user.save();

	return user;
};

const disconnectedUser = async (uid = '') => {
	const user = await User.findByIdAndUpdate(uid, { isOnline: false });
	return user;
};

const saveMessage = async payload => {
	/*
        Payload structure:
        payload = {
            to: '',
            from: '',
            message: '',
        }
    */
	try {
		const message = new Message(payload);
		await message.save();
		return true;
	} catch (error) {
		return false;
	}
};

module.exports = { connectedUser, disconnectedUser, saveMessage };
