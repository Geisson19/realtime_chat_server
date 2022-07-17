const { io } = require('../index');

const { verifyJWT } = require('../helpers/jwt');
const { connectedUser, disconnectedUser } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
	const clientToken = client.handshake.headers['x-token'];

	const [isValid, uid] = verifyJWT(clientToken);

	if (!isValid) return client.disconnect(true);

	connectedUser(uid);

	// Join user to room
	client.join(uid);

	// Get message from client
	client.on('send-message', payload => {
		console.log(payload);
		io.to(payload.to).emit('send-message', payload);
	});

	client.on('disconnect', () => {
		console.log('Cliente desconectado');
		disconnectedUser(uid);
	});
});
