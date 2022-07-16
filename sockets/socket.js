const { io } = require('../index');

const { verifyJWT } = require('../helpers/jwt');
const { connectedUser, disconnectedUser } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
	console.log('Cliente conectado');

	const clientToken = client.handshake.headers['x-token'];

	const [isValid, uid] = verifyJWT(clientToken);

	if (!isValid) return client.disconnect(true);

	const user = connectedUser(uid);

	client.on('disconnect', () => {
		console.log('Cliente desconectado');
		disconnectedUser(uid);
	});
});
