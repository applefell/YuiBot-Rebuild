const Discord = require('discord.js');
const fs = require('fs');
const Client = require('./client/Client');
const { globalPrefix, token } = require('./config.json');
const Keyv = require('keyv');
const client = new Client();
const online = true;
const { Op } = require('sequelize');
const moners = new Discord.Collection();
const chalk = require('chalk');
const winston = require('winston');
const { Users, Shop } = require('./Objects');
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

// for more member control
new Discord.Guild();

// for data control for guilds and members
const prefixes = new Keyv('sqlite://./database.sqlite');

// idk man economy things
Reflect.defineProperty(moners, 'add', {
	value: async function add(id, amount) {
		const user = moners.get(id);
		if(user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		moners.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(moners, 'getBalance', {
	value: function getBalance(id) {
		const user = moners.get(id);
		return user ? user.balance : 0;
	},
});

prefixes.on('error', err => logger.log('Keyv connection error:', err));

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

async function status() {
	while(online == true) {
		client.user.setPresence({ activity: { name: 'do [help for commands!' }, status: 'online' });
		logger.log('info', chalk.greenBright('changed status'));
		await sleep(3600000);
		client.user.setActivity('Please crash the economy of this bot', { type: 'PLAYING' });
		logger.log('info', chalk.greenBright('changed status'));
		await sleep(3600000);
		client.user.setActivity('do [help for commands!');
		logger.log('info', chalk.greenBright('changed status'));
		await sleep(3600000);
		client.user.setActivity('new commands!', { type: 'PLAYING' });
		logger.log('info', chalk.greenBright('changed status'));
		await sleep(3600000);
	}
}

// starts off cooldowns
const cooldowns = new Discord.Collection();

// logs websocket errors
client.on('shardError', error => {
	console.error('error', chalk.redBright('A websocket connection encountered an error:'), error);
});

// logs unhandled rejections
process.on('unhandledRejection', error => {
	logger.log('error', chalk.redBright('Unhandled promise rejection:'), error);
});

// says when bot does the funny thing
client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => moners.set(b.user_id, b));
	logger.log('info', chalk.greenBright.bold('Ready!'));
	status();
});

// for running commands
client.on('message', async message => {
	if(message.author.bot) return;

	if(!message.author.bot) {
		const ran = Math.floor(Math.random() * (100 - 1) + 1);

		if(ran >= 55) {
			moners.add(message.author.id, 1000);
		}
	}

	let args;

	if(message.guild) {
		let prefix;

		if(message.content.startsWith(globalPrefix)) {
			prefix = globalPrefix;
		// eslint-disable-next-line brace-style
		} else {
			// checks guilds prefix
			const guildPrefix = await prefixes.get(message.guild.id);
			if(message.content.startsWith(guildPrefix)) prefix = guildPrefix;
		}

		// checks for prefix
		if(!prefix) return;
		args = message.content.slice(prefix.length).trim().split(/ +/);

	// eslint-disable-next-line brace-style
	} else {

		// handling dms
		const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
		args = message.content.slice(slice).split(/ +/);
	}

	const commandName = args.shift().toLowerCase();

	if(commandName == 'buy') {
		const author_id = message.author.id;
		const userbal = moners.getBalance(author_id);
		const item = await Shop.findOne({ where: { name: { [Op.like]: args } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > userbal) {
			return message.channel.send(`You currently have ${userbal}, but the ${item.name} costs ${item.cost}!`);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		moners.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought: ${item.name}.`);
	}

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	// checks if a command can only be used in a guild
	if(command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t do that in DMs.');
	}

	// checks if a command requires arguments
	if(command.args && !args.length) {
		let reply = `${message.author}, You didnt provide any arguments!`;

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
		command.execute(message, args);
	// Why do I not just diable this? idk man I just don't
	// eslint-disable-next-line brace-style
	} catch(error) {
		logger.log('error', error);
		message.reply('An error occured while executing that command.');
	}
});

// login to discord
client.login(token);

module.exports = { Users, moners, Shop, Op, client };