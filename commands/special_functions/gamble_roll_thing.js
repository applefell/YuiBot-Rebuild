/* eslint-disable brace-style */
function gambleRoll(ran) {
	switch(ran) {
	// 1-5 = apple, 6-9 = cherry, 10-12 = melon, 13-14 = cheese, 15 = burger
	case 1:
		return '🍎';
	case 2:
		return '🍎';
	case 3:
		return '🍎';
	case 4:
		return '🍎';
	case 5:
		return '🍎';
	case 6:
		return '🍒';
	case 7:
		return '🍒';
	case 8:
		return '🍒';
	case 9:
		return '🍒';
	case 10:
		return '🍉';
	case 11:
		return '🍉';
	case 12:
		return '🍉';
	case 13:
		return '🧀';
	case 14:
		return '🧀';
	case 15:
		return '🍔';
	}
}

function gambleValue(ran) {
	switch(ran) {
	// 1-5 = apple, 6-9 = cherry, 10-12 = melon, 13-14 = cheese, 15 = burger
	case 1:
		return 1;
	case 2:
		return 1;
	case 3:
		return 1;
	case 4:
		return 1;
	case 5:
		return 1;
	case 6:
		return 2;
	case 7:
		return 2;
	case 8:
		return 2;
	case 9:
		return 2;
	case 10:
		return 3;
	case 11:
		return 3;
	case 12:
		return 3;
	case 13:
		return 4;
	case 14:
		return 4;
	case 15:
		return 5;
	}
}

function payout(ran1Value, ran2Value, ran3Value) {
	if(ran1Value == 1 && ran2Value == 1 && ran3Value == 1) {
		return 1.25;
	} else if(ran1Value == 2 && ran2Value == 1 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 3 && ran2Value == 1 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 4 && ran2Value == 1 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 5 && ran2Value == 1 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 2 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 3 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 4 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 5 && ran3Value == 1) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 1 && ran3Value == 2) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 1 && ran3Value == 3) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 1 && ran3Value == 4) {
		return 1;
	} else if(ran1Value == 1 && ran2Value == 1 && ran3Value == 5) {
		return 1;
	} else if(ran1Value == 2 && ran2Value == 2 && ran3Value == 2) {
		return 1.5;
	} else if(ran1Value == 3 && ran2Value == 3 && ran3Value == 3) {
		return 1.75;
	} else if(ran1Value == 4 && ran2Value == 4 && ran3Value == 4) {
		return 2;
	} else if(ran1Value == 5 && ran2Value == 5 && ran3Value == 5) {
		return 3;
	} else {
		return 0;
	}
}

function color(mult) {
	if(mult == 0) {
		return '#ff0000';
	} else {
		return '#1dde47';
	}
}

function title(titleRan) {
	switch(titleRan) {
	case 1:
		return 'I sure do love gambling';
	case 2:
		return 'I hope I didn\'t lose anything';
	case 3:
		return 'Come on jackpot';
	}
}

module.exports = { gambleRoll, gambleValue, payout, color, title };