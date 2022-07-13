const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

// Database connection
const { connection } = require('./database/config');
connection();

// Express instance
const app = express();

// Enable CORS
app.use(cors());

// Json reader and parser
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// public folder path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Routes
app.use('/api/auth', require('./routes/auth'));

// Start server
server.listen(process.env.PORT, err => {
	if (err) throw new Error(err);
	console.log(`Server running on port ${process.env.PORT}`);
});
