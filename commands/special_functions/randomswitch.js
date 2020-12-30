const kon = require('./image_switch');
const bocchi = require('./bocchi_switch');
const imas = require('./imas_switch');

function randomSwitchHub(ran) {
	switch(ran) {
	case 1: {
		const ranNum = Math.floor(Math.random() * (989 - 1) + 1);

		return kon.findImage(ranNum);
	}
	case 2: {
		const ranNum = Math.floor(Math.random() * (60 - 1) + 1);

		return bocchi.findBocchi(ranNum);
	}
	case 3: {
		const ranNum = Math.floor(Math.random() * (353 - 1) + 1);

		return imas.findImas(ranNum);
	}
	}
}

module.exports = { randomSwitchHub };