'use strict';
const math = require('mathjs');

let tweetHandler = {};

tweetHandler.setLanguage = function(dictionary) {
	this.dictionary = dictionary;
}

tweetHandler.handle = function(tweet) {
	let operations = this.getOperations(tweet.text);
	let results = this.calculateResults(operations);
	
	return this.createResponse(tweet.user.screen_name, results);
}

tweetHandler.getOperations = function(text) {
	let operations = [];
	let mathRegex = /(\S*\d[^,?. ;\n]*)/g;

	let result = mathRegex.exec(text);
	while(result !== null && result !== undefined) {
		operations.push(result[1]);
		result = mathRegex.exec(text);
	};

	return operations;
}

tweetHandler.calculateResults = function(operations) {
	let results = [];

	operations.forEach((operation) => {
		results.push({operation: operation, result: math.eval(operation)});
	});

	return results;
}

tweetHandler.createResponse = function(username, results) {
	if (results.length === 0) {
		return ``;
	}

	let randomGreeting = Math.floor(Math.random() * (this.dictionary.greetings.length - 1)) + 1; 
	let randomAnswerText = Math.floor(Math.random() * (this.dictionary.answers.length - 1)) + 1;

	let chosenGreeting = this.dictionary.greetings[randomGreeting];
	let chosenAnswerText = this.dictionary.answers[randomAnswerText];

	let responseStrings = [];
	results.forEach((result) => {
		responseStrings.push(`${result.operation} = ${result.result}`);
	});

	let finalResponse = `${chosenGreeting} @${username}, ${chosenAnswerText}\n${responseStrings.join('\n')}`;

	if (finalResponse.length > 140) {
		let randomErrorText = Math.floor(Math.random() * (this.dictionary.lengthErrors.length - 1)) + 1;
		finalResponse = `@${username} ${this.dictionary.lengthErrors[randomErrorText]}`;
	}

	return finalResponse;
}

module.exports = tweetHandler;