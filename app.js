'use strict';
const apiConfigs = require('./configs/api');
const dictionary = require('./configs/language');

const Twitter = require('twitter');
const tweetHandler = require('./lib/tweetHandler');

tweetHandler.setLanguage(dictionary.en);

let twitterClient = new Twitter({
  consumer_key: apiConfigs.apiKey,
  consumer_secret: apiConfigs.apiSecret,
  access_token_key: apiConfigs.accessToken,
  access_token_secret: apiConfigs.accessTokenSecret
});

// TODO make @username configurable
twitterClient.stream('statuses/filter', {track: '@raspythagoras'}, (stream) => {
  stream.on('data', function(tweet) {
    tweetHandler.handle(tweet);
  });
 
  stream.on('error', function(error) {
    console.log(error);
  });
});