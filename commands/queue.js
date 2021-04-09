const Discord = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Fetches up to the next 10 songs in the queue',
    cooldown: 3,
    execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send('There is nothing in the queue');

        if(!serverQueue[1]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[2]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[3]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[4]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                    { name: '4.', value: `${serverQueue[3].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[5]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                    { name: '4.', value: `${serverQueue[3].title}`},
                    { name: '5.', value: `${serverQueue[4].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[6]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                    { name: '4.', value: `${serverQueue[3].title}`},
                    { name: '5.', value: `${serverQueue[4].title}`},
                    { name: '6.', value: `${serverQueue[5].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[7]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                    { name: '4.', value: `${serverQueue[3].title}`},
                    { name: '5.', value: `${serverQueue[4].title}`},
                    { name: '6.', value: `${serverQueue[5].title}`},
                    { name: '7.', value: `${serverQueue[6].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[8]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                    { name: '4.', value: `${serverQueue[3].title}`},
                    { name: '5.', value: `${serverQueue[4].title}`},
                    { name: '6.', value: `${serverQueue[5].title}`},
                    { name: '7.', value: `${serverQueue[6].title}`},
                    { name: '8.', value: `${serverQueue[7].title}`},
                );

            message.channel.send(embed);
        } else if(!serverQueue[9]) {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                    { name: '4.', value: `${serverQueue[3].title}`},
                    { name: '5.', value: `${serverQueue[4].title}`},
                    { name: '6.', value: `${serverQueue[5].title}`},
                    { name: '7.', value: `${serverQueue[6].title}`},
                    { name: '8.', value: `${serverQueue[7].title}`},
                    { name: '9.', value: `${serverQueue[8].title}`},
                );

            message.channel.send(embed);
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#1dde47')
                .setTimestamp()
                .addFields(
                    { name: '1.', value: `${serverQueue[0].title}`},
                    { name: '2.', value: `${serverQueue[1].title}`},
                    { name: '3.', value: `${serverQueue[2].title}`},
                    { name: '4.', value: `${serverQueue[3].title}`},
                    { name: '5.', value: `${serverQueue[4].title}`},
                    { name: '6.', value: `${serverQueue[5].title}`},
                    { name: '7.', value: `${serverQueue[6].title}`},
                    { name: '8.', value: `${serverQueue[7].title}`},
                    { name: '9.', value: `${serverQueue[8].title}`},
                    { name: '10.', value: `${serverQueue[9].title}`},
                );

            message.channel.send(embed);
        }
    }
}