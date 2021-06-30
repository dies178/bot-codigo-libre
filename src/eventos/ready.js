module.exports = {
	name: 'ready',
	once: true,
	execute() {
		console.log(`${message.client.user.usernsame} esta encendido`);
	},
};