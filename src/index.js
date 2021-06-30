//modulos
const Discord = require("discord.js");
const fs = require("fs")
const path = require("path");

//otros archivos
const { token_bot } = require("./json/config.json");

//constantes del path
const path_command = path.join(__dirname, "commands");
const path_eventos = path.join(__dirname, "eventos");

//client
const client = new Discord.Client();

//creamos una colecion
client.commands = new Discord.Collection();

//ponemos los eventos
const eventFiles = fs.readdirSync(path_eventos).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./eventos/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//añadir los comandos a la collecion
const commandFiles = fs.readdirSync(path_command).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};

//iniciar bot
client.login(token_bot);