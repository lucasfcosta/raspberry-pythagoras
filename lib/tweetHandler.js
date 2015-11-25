'use strict';
const math = require('mathjs');

let tweetHandler = {};

tweetHandler.handle = function(tweet) {
	let operations = this.getOperations(tweet.text);
}

tweetHandler.getOperations = function(text) {
	let operations = [];

	text.split(' ').forEach((word) => {
	  	if (word.match(/\d/)) {
	      	operations.push(word);
	  	}
	});

	return operations;
}

tweetHandler.handle({text: 'How much is 2+2/3*7 and sin(45)?'});

module.exports = tweetHandler;