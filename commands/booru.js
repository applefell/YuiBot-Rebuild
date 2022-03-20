const booru = require('booru');
const Discord = require('discord.js');
const booruColor = require('./special_functions/switches');

module.exports = {
    name: 'booru',
    description: 'searches for an image on safebooru',
	cooldown: 10,
	guildOnly: false,
	args: true,
	usage: 'tag',
    execute(client, message, args) {
        const tags = args.join(' ');

        booru.search('safebooru', [tags], { limit: 1, random: true })
            .then(posts => {
                for (const post of posts) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(booruColor.booruColor())
                        .setTimestamp()
                        .setImage(`${post.fileUrl}`);

                    message.channel.send(embed);
                }
            });
    },
};