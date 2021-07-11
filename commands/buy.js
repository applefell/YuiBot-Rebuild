module.exports = {
    name: 'buy',
    description: 'Lets you buy items from the store!',
    cooldown: 3,
    async execute(client, message, args) {
        const item = args[0];
        const itemName = item.toLowerCase();
        client.Shop.findOne({
            name: itemName,
        }, (err, data) => {
            if (err) client.logger.log('error', client.chalk.redBright(err));
            if (!data) {
                message.channel.send('That item does not exist!');
            }
            if (data) {
                if (itemName === 'coffee') {
                    client.Users.findOne({
                        user_id: message.author.id,
                    }, (err, data) => {
                        if (err) client.logger.log('error', client.chalk.redBright(err));
                        if (!data) {
                            message.channel.send('You do not have enough money to buy this item!');
                        } else if (data) {
                            if (data.balance < 2) {
                                message.channel.send('You do not have enough money to buy this item!');
                            } else if (data.balance >= 2) {
                                client.Useritems.findOne({
                                    user_id: message.author.id,
                                }, (err, data) => {
                                    if (err) client.logger.log('error', client.chalk.redBright(err));
                                    if(!data) {
                                        const newData = new client.Useritems({
                                            user_id: message.author.id,
                                            coffee: 1,
                                            tea: 0,
                                            cake: 0,
                                        });
                                        message.channel.send('Enjoy the coffee.');
                                        newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
                                    } else if (data) {
                                        data.coffee += 1;
                                        message.channel.send('Enjoy the coffee.');
                                        data.save().catch(err => client.logger.log(client.chalk.redBright(err)));
                                    }
                                });
                                data.balance -=2;
                                data.save().catch(err => client.logger.log(client.chalk.redBright(err)));
                            }
                        }
                    })
                } else if (itemName === 'cake') {
                    client.Users.findOne({
                        user_id: message.author.id,
                    }, (err, data) => {
                        if (err) client.logger.log('error', client.chalk.redBright(err));
                        if (!data) {
                            message.channel.send('You do not have enough money to buy this item!');
                        } else if (data) {
                            if (data.balance < 2) {
                                message.channel.send('You do not have enough money to buy this item!');
                            } else if (data.balance >= 2) {
                                client.Useritems.findOne({
                                    user_id: message.author.id,
                                }, (err, data) => {
                                    if (err) client.logger.log('error', client.chalk.redBright(err));
                                    if(!data) {
                                        const newData = new client.Useritems({
                                            user_id: message.author.id,
                                            coffee: 0,
                                            tea: 0,
                                            cake: 1,
                                        });
                                        message.channel.send('Enjoy the cake.');
                                        newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
                                    } else if (data) {
                                        data.cake += 1;
                                        message.channel.send('Enjoy the cake.');
                                        data.save().catch(err => client.logger.log(client.chalk.redBright(err)));
                                    }
                                });
                                data.balance -=5;
                                data.save().catch(err => client.logger.log(client.chalk.redBright(err)));
                            }
                        }
                    })
                } else if (itemName === 'tea') {
                    client.Users.findOne({
                        user_id: message.author.id,
                    }, (err, data) => {
                        if (err) client.logger.log('error', client.chalk.redBright(err));
                        if (!data) {
                            message.channel.send('You do not have enough money to buy this item!');
                        } else if (data) {
                            if (data.balance < 2) {
                                message.channel.send('You do not have enough money to buy this item!');
                            } else if (data.balance >= 2) {
                                client.Useritems.findOne({
                                    user_id: message.author.id,
                                }, (err, data) => {
                                    if (err) client.logger.log('error', client.chalk.redBright(err));
                                    if(!data) {
                                        const newData = new client.Useritems({
                                            user_id: message.author.id,
                                            coffee: 0,
                                            tea: 1,
                                            cake: 0,
                                        });
                                        message.channel.send('Enjoy the tea.');
                                        newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
                                    } else if (data) {
                                        data.tea += 1;
                                        message.channel.send('Enjoy the tea.');
                                        data.save().catch(err => client.logger.log(client.chalk.redBright(err)));
                                    }
                                });
                                data.balance -=1;
                                data.save().catch(err => client.logger.log(client.chalk.redBright(err)));
                            }
                        }
                    })
                }
            }
        });
    },
};