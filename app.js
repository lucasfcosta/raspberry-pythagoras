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

console.log('Starting Raspberry Pythagoras');

twitterClient.stream('statuses/filter', {track: `@${apiConfigs.username}`}, (stream) => {

    console.log('Monitoring tweet stream...');

    stream.on('data', (tweet) => {
        let username = tweet.user.screen_name;
        console.log(`[Mention Received] ${username}: ${tweet.text}`);

        tweetHandler.handle(tweet, (handleError, responseText) => {
            if (handleError) {
                console.log(`[Error] ${handleError.message}`);

                // Send DM to user explaining error
                twitterClient.post('direct_messages/new', {screen_name: username, text: handleError.message},
                    (error) => {
                        if (error) {
                            console.log(`[DM Error] ${error.message}`);
                        } else {
                            console.log(`[DM Sent] Sent DM with error:\n ${handleError.message} to user ${username}.`);
                        }
                    });
            } else {
                twitterClient.post('statuses/update', {status: responseText}, (error) => {
                    if (error) {
                        console.log(`[Tweet Error] ${error}`);
                    } else {
                        console.log(`[Answer Tweeted] ${responseText}`);
                    }
                });
            }
        });
    });

    stream.on('error', (error) => {
        console.log(`[Unhandled Error] ${error.message}`);
    });
});

// Post a tip every 3 hours
setInterval(() => {
    let randomTipNumber = Math.floor(Math.random() * (chosenDictionary.idle.length - 1)) + 1;
    let randomTipText = chosenDictionary.idle[randomTipNumber];
    twitterClient.post('statuses/update', {status: randomTipText}, (error) => {
        if (error) {
            console.log(`[Tip Tweet Error] ${error}`);
        } else {
            console.log(`[Tip Tweeted] ${randomTipText}`);
        }
    });
}, 10800000);
