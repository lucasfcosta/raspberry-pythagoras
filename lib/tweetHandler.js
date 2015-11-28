'use strict';
const math = require('mathjs');

let tweetHandler = {};

tweetHandler.setLanguage = function(dictionary) {
	this.dictionary = dictionary;
}

tweetHandler.handle = function(tweet, callback) {
	let operations = this.getOperations(tweet.text);
	let results;
	let responseText;
	let error;

	try {
		results = this.calculateResults(tweet.user.screen_name, operations);
		responseText = this.createResponse(tweet.user.screen_name, results);
	} catch (e) {
		error = e;
	}
	
	callback(error, responseText);
}

tweetHandler.getOperations = function(text) {
	let operations = [];
	let mathRegex = /(\S*\d[^,?. ;\n]*)/g;

	let regexResult = mathRegex.exec(text);
	while(regexResult !== null && regexResult !== undefined) {
		operations.push(regexResult[1]);
		regexResult = mathRegex.exec(text);
	};

	return operations;
}

tweetHandler.calculateResults = function(username, operations) {
	let results = [];

	operations.forEach((operation) => {
		let operationResult;

		try {
			operationResult = math.eval(operation);
		} catch(e) {
			throw new Error(this.createErrorMessage(username, this.dictionary.parseErrors, e.message))
		}

		if (isNaN(operationResult) || operationResult === Infinity) {
			throw new Error(`Hi @${username},\nYour operation's result was ${operationResult}. I hope you were not trying to outsmart me!\nHahahahaha`);
		}

		results.push({operation: operation, result: operationResult});
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
		throw new Error(this.createErrorMessage(username, this.dictionary.lengthErrors));
	}

	return finalResponse;
}

tweetHandler.createErrorMessage = function(username, errorMessages, specificError) {
	let randomGreeting = Math.floor(Math.random() * (this.dictionary.greetings.length - 1)) + 1;
	let randomMessage = Math.floor(Math.random() * (errorMessages.length - 1)) + 1;
	let errorMessage = `${this.dictionary.greetings[randomGreeting]} ${username},\n${errorMessages[randomMessage]}`;

	if (specificError) {
		errorMessage += `\n${specificError}`;
	}

	return errorMessage;
}

module.exports = tweetHandler;