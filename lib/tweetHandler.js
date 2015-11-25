'use strict';
const math = require('mathjs');

let tweetHandler = {};

tweetHandler.handle = function(tweet) {
	let operations = this.getOperations(tweet.text);
}

tweetHandler.getOperations = function(text) {
	let operations = [];
	let mathRegex = /(\S*\d[^,?. ;]*)/g;

	let result = mathRegex.exec(text);
	while(result !== null && result !== undefined) {
		operations.push(result[1]);
		result = mathRegex.exec(text);
	};

	return operations;
}

// Temporary test commands
//tweetHandler.handle({text: 'How much is 2+2/3*7 and sin(45)?'});
//tweetHandler.handle({text: 'No operations here'});

module.exports = tweetHandler;