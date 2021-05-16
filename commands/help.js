const { globalPrefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: 'Lists all commands and info on each command!',
	aliases: ['commands'],
	cooldown: 5,
	execute(client, message, args) {
		const data = [];
		const { commands } = message.client;

		if(!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', ') + ', buy, sell');
			data.push(`\nYou can send \`${globalPrefix}help [command name]\` to get help with a specific command! \nYou can also join my discord server at: discord.gg/W3tvcam`);

			return message.author.send(data, { split: true }).then(() => {
				if(message.channel.type === 'dm') return;
				message.reply('I\'ve sent you a DM with all my commands!');
			// eslint-disable-next-line no-unused-vars
			}).catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n, error`);
				message.reply('it seems like I can\'t DM you. Do you have them disabled?');
			});
		}
		const name = args[0].toLowerCase();

		if(name == 'buy') {
			message.channel.send('**Name:** buy\n**Description:** Lets you buy stuff with your moners!\n**Usage:** `[buy (item name)`');
		}

		if(name == 'sell') {
			message.channel.send('**Name:** buy\n**Description:** Lets you sell the items you have purchased!\n**Usage:** `[sell (item name)`');
		}

		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if(!command) {
			return message.reply('That\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if(command.description) data.push(`**Description:** ${command.description}`);
		if(command.usage) data.push(`**Usage:** ${globalPrefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};