var enemyPokemonList = [
	'Metang',
	'Oshawott',
	'Metang',
	'Oshawott',
	'Salamence',
];
var enemyAttackList = ['Tackle', 'Growl', 'Shatter', 'Steam Blast'];
var enemyAttackPower = [3, 1, 4, 6];
var userPokemonList = ['Rayquaza EX', 'Bellossom', 'Aron', 'Slurpuff'];
var userPokemonNum; // Rayquaza EX = 0, Bellossom = 1, Aron = 2, Slurpuff = 3
var userAttackList = [
	'Power Howl',
	'Mega Ascension',
	'Aeroscream',
	'Windmill',
	'Bloom Doom',
	'Flower Tornado',
	'Iron Head',
	'Headbutt',
	'Autotomize',
	'Tasting',
	'Light Pulse',
	'Baby-Doll Eyes',
];
var userAttackPower = [4, 6, 7, 2, 3, 1, 1, 3, 2, 2, 1, 3];
var enemyPokemon;
var enemyAttack;
var userPokemon;
var userAttackOptions;
var userAttack;
userHP = 10;
enemyHP = 10;
var stage;

//var gbPlayGame = confirm('would you like to play a pokemon game?');
//startGame();

function leaveConfirm() {
	var leave = confirm(
		"you've hit cancel. are you sure you want to leave? \n\nto leave, press OK \nto stay, press CANCEL"
	);
	if (leave === true) {
		alert('okay, see ya later!');
		throw Error;
	} else if (leave === false) {
		switch (stage) {
			case 1:
				startGame();
				break;
			case 2:
				chooseDefender();
				break;
			case 3:
				errorAlert();
				break;
			case 4:
				attack();
				break;
		}
	}
}

//  Below here is the main game function that calls all other functions
function startGame() {
	stage = 1;
	if (gbPlayGame === true) {
		chooseEnemy();
		var userPokemonNum = prompt(
			'Okay...an angry ' +
				enemyPokemon +
				' has appeared!\nQuick! Who do you choose to be your defender (type a number)? \n\n1. ' +
				userPokemonList[1] +
				' \n2. ' +
				userPokemonList[2] +
				' \n3. ' +
				userPokemonList[3]
		);
		if (
			userPokemonNum !== '0' &&
			userPokemonNum !== '1' &&
			userPokemonNum !== '2' &&
			userPokemonNum !== '3' &&
			userPokemonNum !== null
		) {
			errorAlert();
			startGame();
		} else if (
			userPokemonNum == '0' ||
			userPokemonNum == '1' ||
			userPokemonNum == '2' ||
			userPokemonNum == '3'
		) {
			assignPokemon(userPokemonNum);
			attack();
			winner();
		} else if (userPokemonNum === null) {
			leaveConfirm();
		}
	} else {
		alert('okay, maybe we can play later.');
	}
}

//  Below here are all support functions

// this function will be to randomly choose an enemy pokemon to be the user's opponent.

function chooseEnemy() {
	var lnRandomNumberChooseEnemy = Math.floor(Math.random() * 5);
	enemyPokemon = enemyPokemonList[lnRandomNumberChooseEnemy];
}

// this function will randomly assign and enemy attack

function findEnemyAttack() {
	var lnRandomNumberFindEnemyAttack = Math.floor(Math.random() * 2);
	enemyAttack = enemyAttackList[lnRandomNumberFindEnemyAttack];
	if (enemyPokemon != 'Salamence') {
		enemyAttack = enemyAttackList[lnRandomNumberFindEnemyAttack];
		return enemyAttackPower[lnRandomNumberFindEnemyAttack];
	} else {
		enemyAttack = enemyAttackList[lnRandomNumberFindEnemyAttack + 2];
		return enemyAttackPower[lnRandomNumberFindEnemyAttack + 2];
	}
}

// this function is to choose your defender

function chooseDefender() {
	stage = 2;
	var userPokemonNum = prompt(
		'Okay...an angry ' +
			enemyPokemon +
			' has appeared!\nQuick! Who do you choose to be your defender (type a number)? \n\n1. ' +
			userPokemonList[1] +
			' \n2. ' +
			userPokemonList[2] +
			' \n3. ' +
			userPokemonList[3]
	);
	if (
		userPokemonNum !== '0' &&
		userPokemonNum !== '1' &&
		userPokemonNum !== '2' &&
		userPokemonNum !== '3'
	) {
		errorAlert();
		startGame();
	} else {
		assignPokemon(userPokemonNum);
	}
}

// this function will be the error checker
function errorAlert() {
	stage = 3;
	alert('Invalid answer, please try again!');
}

// assignment to the Pokemon defender when they press the number
function assignPokemon(choice) {
	userPokemon = userPokemonList[choice];
	userAttackOptions = '';
	for (i = 0; i < 3; i++) {
		userAttackOptions += '\n' + (i + 1) + '. ' + userAttackList[i + choice * 3];
	}
	userPokemonNum = choice;
}

// allows the user to choose their attack and decrease health points
function attack() {
	stage = 4;
	do {
		// loop until either user HP or enemy HP are 0
		var attackNum = prompt(
			userPokemon +
				' HP: ' +
				userHP +
				'\n' +
				enemyPokemon +
				' HP: ' +
				enemyHP +
				"\n\nLet's go, " +
				userPokemon +
				'!\nWhat do you choose? Please type a number.\n\n' +
				userAttackOptions
		);
		if (
			attackNum != 1 &&
			attackNum != 2 &&
			attackNum != 3 &&
			attackNum !== null
		) {
			errorAlert();
			attack();
		} else if (attackNum === null) {
			leaveConfirm();
		} else {
			// decrease HP based on the last attack
			userHP -= findEnemyAttack();
			enemyHP -= findUserAttack(attackNum);
			alert('look out! ' + enemyPokemon + ' attacks with ' + enemyAttack + '!');
			//this makes sure the ending HP's are never less than zero
			if (enemyHP < 0 && userHP < 0) {
				enemyHP = 0;
				userHP = 0;
			} else if (userHP < 0) {
				userHP = 0;
			} else if (enemyHP < 0) {
				enemyHP = 0;
			}
			//the next line of code is for debugging
			//console.log("enemy pokemon: " + enemyPokemon + "\n	HP: " + enemyHP + "\nuser pokemon: " + userPokemon + "\n	HP: " + userHP);
		}
	} while (userHP > 0 && enemyHP > 0);
}

// this function will be to decrease the enemy HP based on the user's attack
stage = findUserAttack();
function findUserAttack(choice) {
	userAttack = userAttackList[choice - 1 + 3 * userPokemonNum];
	return userAttackPower[choice - 1 + 3 * userPokemonNum];
}

//this function will be to declare a winner
function winner() {
	if (enemyHP > userHP) {
		alert('you lose! ' + enemyPokemon + ' wins!');
	} else if (enemyHP < userHP) {
		alert('you win! ' + enemyPokemon + ' loses!');
	} else {
		alert('there was a tie!');
	}
}
