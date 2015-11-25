'use strict';
const Twitter = require('twitter');
const apiConfigs = require('./configs/api');

let twitterClient = new Twitter({
  consumer_key: apiConfigs.apiKey,
  consumer_secret: apiConfigs.apiSecret,
  access_token_key: apiConfigs.accessToken,
  access_token_secret: apiConfigs.accessTokenSecret
});

// TODO make @username configurable
twitterClient.stream('statuses/filter', {track: '@raspythagoras'}, (stream) => {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    console.log(error);
  });
});

