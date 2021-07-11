const { execute } = require("./buy");

module.exports = {
    name: 'inventory',
    description: 'Lets you check your inventory!',
    cooldown: 3,
    aliases: ['inv', 'items'],
    async execute(client, message, args) {
        client.Useritems.findOne({
            user_id: message.author.id,
        }, (err, data) => {
            if (err) client.logger.log('error', client.chalk.redBright(err));
            if (!data) {
                message.channel.send('You do not have any items!');
            } else if (data) {
                message.channel.send(`cake: ${data.cake}\ntea: ${data.tea}\ncoffee: ${data.coffee}`, { code: true });
            }
        })
    }
}