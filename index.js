const Discord = require('discord.js');
const fs = require('fs');
const Client = require('./client/Client');
<<<<<<< Updated upstream
const { globalPrefix, token, mongoPass } = require('./config.json');
=======
const { globalPrefix, token, mongoPass, owner } = require('./config.json');
>>>>>>> Stashed changes
const client = new Client();
const { shopInit } = require('./models/shopinit');
const online = true;
client.chalk = require('chalk');
const winston = require('winston');
client.logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});
client.mongoose = require('mongoose');

// for more member control
new Discord.Guild();

// Connect to database
client.mongoose.connect(mongoPass, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Set up database controls
client.Users = require('./models/Users');
client.Shop = require('./models/Shop');
client.Useritems = require('./models/UserItems');
client.Servers = require('./models/Servers');

// Add items to the shop
shopInit(client);

// makes the commands folder work with this
client.commands = new Discord.Collection();

// makes sure that a command is a .js file
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// changes the status of the bot
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// eslint-disable-next-line no-unused-vars
async function status() {
	while(online == true) {
		client.user.setPresence({ activity: { name: 'do [help for commands!' }, status: 'online' });
		client.logger.log('info', client.chalk.greenBright('changed status'));
		await sleep(3600000);
		client.user.setActivity('haha gambling', { type: 'PLAYING' });
		client.logger.log('info', client.chalk.greenBright('changed status'));
		await sleep(3600000);
		client.user.setActivity('');
		client.logger.log('info', client.chalk.greenBright('changed status'));
		await sleep(3600000);
		client.user.setActivity('new commands!', { type: 'PLAYING' });
		client.logger.log('info', client.chalk.greenBright('changed status'));
		await sleep(3600000);
	}
}

// starts off cooldowns
const cooldowns = new Discord.Collection();

// logs websocket errors
client.on('shardError', error => {
	client.logger.log('error', client.chalk.redBright(`A websocket connection encountered an error: ${error}`));
});

// logs unhandled rejections
process.on('unhandledRejection', error => {
	client.logger.log('error', client.chalk.redBright('Unhandled promise rejection:'), error);
});

// says when bot does the funny thing
client.once('ready', async () => {
	client.logger.log('info', client.chalk.greenBright.bold('Ready!'));
	// status();
	client.user.setPresence({ activity: { name: 'How do I write a funny status' }, status: 'online' });
});

// for running commands
client.on('message', async message => {
	if(message.author.bot) return;

	if(!message.author.bot) {
		const ran = Math.floor(Math.random() * (100 - 1) + 1);
		const potential_xp = Math.floor(Math.random() * (7 - 1) + 1);

		// Gives users a chance of earning money on a message
		if(ran >= 65) {
			client.Users.findOne({
				user_id: message.author.id,
			}, (err, data) => {
				if(err) client.logger.log('error', client.chalk.redBright(err));
				if(!data) {
					const newData = new client.Users({
						user_id: message.author.id,
						balance: 1,
						xp: 0,
						level: 0,
						xp_cooldown: 900000000,
						hugs: 0,
						punches: 0,
						cries: 0,
					});
					newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				} else if(data) {
					data.balance += 1;
					data.save().catch(err => client.logger.log(client.chalk.redBright(err)));
				}
			});
		}

		// Gives users somewhere between 1 and 7 xp if the xp cooldown is up
		client.Users.findOne({
			user_id: message.author.id,
		}, (err, data) => {
			if(err) client.logger.log('error', client.chalk.redBright(err));
			if(!data) {
				const newData = new client.Users({
					user_id: message.author.id,
					balance: 0,
					xp: potential_xp,
					level: 0,
					xp_cooldown: Date.now(),
					hugs: 0,
					punches: 0,
					cries: 0,
				});
				newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
			} else if(data) {
				if(Date.now() - data.xp_cooldown > 120000) {
					data.xp += potential_xp;
					data.xp_cooldown = Date.now();
					data.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				} else {
					return;
				}
			}
		});
	}

	// Feels jank, improve later??
	function doTheThing(args) {
		const commandName = args.shift().toLowerCase();

<<<<<<< Updated upstream
=======
		if (commandName === 'status') {
			const ID = message.author.id;
			if (ID === owner) {
				const stat = args.join(' ');
				client.user.setActivity(`${stat}`, { type: 'PLAYING' });
				client.logger.log('info', client.chalk.greenBright.bold('Manually set status'));
			} else if (ID != owner) {
				message.channel.send('Hey! You can\'t do that!');
			}
		}

>>>>>>> Stashed changes
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if(!command) return;

		// checks if a command can only be used in a guild
		if(command.guildOnly && message.channel.type === 'dm') {
			return message.reply('I can\'t do that in DMs.');
		}

		// checks if a command requires arguments
		if(command.args && !args.length) {
			let reply = `${message.author}, You didn't provide any arguments!`;

			if(command.usage) {
				reply += `\nTo use this command do: \`${globalPrefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}

		// Makes sure that a command stays on cooldown for the right amount of time
		if(!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if(timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if(now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(client, message, args);
<<<<<<< Updated upstream
		} catch(error) {
=======
		} catch (error) {
>>>>>>> Stashed changes
			client.logger.log('error', client.chalk.redBright(error));
			message.reply('An error occured while executing that command.');
		}
	}

	let args;
	let prefixToUse;

	// Checks to see if server is using global prefix
	if (message.guild) {
		if (message.content.startsWith(globalPrefix)) {
			prefixToUse = globalPrefix;
		} else {
			client.Servers.findOne({
				server_id: message.guild.id,
			}, (err, data) => {
				if (err) client.logger.log('error', client.chalk.redBright(err));
				if (!data) {
					// Set server prefix to global prefix just to be safe
					const newData = new client.Servers({
						server_id: message.guild.id,
						prefix: globalPrefix,
						allowInvites: 1,
					});
					newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
					return;
				} else if (data) {
					// use servers own prefix
					const guildPrefix = data.prefix;
					if (message.content.startsWith(guildPrefix)) {
						prefixToUse = guildPrefix;
						if (!prefixToUse) return;
						if (prefixToUse === globalPrefix) return;
						args = message.content.slice(prefixToUse.length).trim().split(/ +/);
						doTheThing(args);
					}
				}
			});
		}

		// If a prefix was found, set up args. If no prefix, not a command
		if (!prefixToUse) return;
		args = message.content.slice(prefixToUse.length).trim().split(/ +/);
<<<<<<< Updated upstream
=======
		doTheThing(args);
>>>>>>> Stashed changes
	} else {
		// For DMs so they still work
		const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
		args = message.content.slice(slice).split(/ +/);
		doTheThing(args);
	}
});

// login to discord
client.login(token);