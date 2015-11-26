'use strict';
const apiConfigs = require('./configs/api');
const dictionary = require('./configs/language');

const Twitter = require('twitter');
const tweetHandler = require('./lib/tweetHandler');
const chosenDictionary = dictionary.en;

tweetHandler.setLanguage(chosenDictionary);

let twitterClient = new Twitter({
	consumer_key: apiConfigs.apiKey,
	consumer_secret: apiConfigs.apiSecret,
	access_token_key: apiConfigs.accessToken,
	access_token_secret: apiConfigs.accessTokenSecret
});

// TODO make @username configurable
twitterClient.stream('statuses/filter', {track: '@raspythagoras'}, (stream) => {

	stream.on('data', (tweet) => {
		console.log('[Mention Received] ' + tweet.text);

		let responseText = tweetHandler.handle(tweet);
	
		twitterClient.post('statuses/update', {status: responseText}, (error, tweet, response) => {
			if (error) {
				console.log(error);
			} else {
				console.log('[Answer Tweeted] ' + responseText);
			}
		});
	});
 
	stream.on('error', (error) => {
		console.log(error);
	});
});

// Post a tip 3 hours
setInterval(() => {
	let randomTipNumber = Math.floor(Math.random() * (chosenDictionary.idle.length - 1)) + 1;
	let randomTipText = chosenDictionary.idle[randomTipNumber];
	twitterClient.post('statuses/update', {status: randomTipText}, (error, tweet, response) => {
		if (error) {
			console.log(error);
		} else {
			console.log('-----------------------');
			console.log('[Tip Tweeted]')
			console.log(randomTipText)
			console.log('-----------------------');
		}
	});	
}, 10800000);