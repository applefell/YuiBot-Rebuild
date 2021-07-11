const fs = require('fs');

function shopInit(client) {
    // Add cake
    client.Shop.findOne ({
        name: 'cake',
    }, (err, data) => {
        if (err) client.logger.log('error', client.chalk.redBright(err));
        if (!data) {
            const newData = new client.Shop({
                name: 'cake',
                cost: 5,
                usable: 1,
            });
            newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
        } else if (data) {
            return;
        }
    });

    // Add tea
    client.Shop.findOne ({
        name: 'tea',
    }, (err, data) => {
        if (err) client.logger.log('error', client.chalk.redBright(err));
        if (!data) {
            const newData = new client.Shop({
                name: 'tea',
                cost: 1,
                usable: 1,
            });
            newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
        } else if (data) {
            return;
        }
    });

    // Add coffee
    client.Shop.findOne ({
        name: 'coffee',
    }, (err, data) => {
        if (err) client.logger.log('error', client.chalk.redBright(err));
        if (!data) {
            const newData = new client.Shop({
                name: 'coffee',
                cost: 2,
                usable: 1,
            });
            newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
        } else if (data) {
            return;
        }
    });
}

module.exports = { shopInit };