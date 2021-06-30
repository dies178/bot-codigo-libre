const { prefix } = require("../json/config.json");

module.exports = {
	name: 'message',
	execute(message) {
		if(message.author.bot || message.channel.type == "md") return;

        if(!message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).split(" ");
            const command = args.shift().toLowerCase();
                
            //comprobamos si en la colecion hay un comando y si no esta return
            if(!message.client.commands.has(command)) return;

            //ejecutamos el comando comprobando si hay errores
            try {
                message.client.commands.get(command).execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('Consulta con el creador, hay un error');
            }
	},
};