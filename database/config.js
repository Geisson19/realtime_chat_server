const mongoose = require('mongoose');

/**
 * It connects to the database using the mongoose library
 */
const connection = async () => {
	try {
		mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('---- Database connected succesfully ----');
	} catch (error) {
		console.log(error);
		throw new Error('Error connecting to database');
	}
};

module.exports = { connection };
