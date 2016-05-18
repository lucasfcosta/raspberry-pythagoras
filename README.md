# [raspberry-pythagoras](https://twitter.com/raspythagoras) [![Build Status](https://travis-ci.org/lucasfcosta/raspberry-pythagoras.svg?branch=master)](https://travis-ci.org/lucasfcosta/raspberry-pythagoras)
A Twitter bot that answers math questions.

lelele


## Installing

*To run raspberry-pythagoras you don't need a Raspberry Pi.*
Currently I'm running mine on a Raspberry Pi B 2, but it's not needed at all.

1. Clone this repository
2. [Register a new Twitter application](https://apps.twitter.com/) to get your API Keys
3. Fill the api.json file with your Twitter API keys and your Twitter screen name.
4. Open your terminal and install dependencies for this project using the command `npm install`
5. Run the main script with `node app.js`

You are now running your own version of raspberry-pythagoras!

Please read the further topics if you intend to run it 24/7.

## Recommendations for Running It

To run my raspberry-pythagoras I'm currently using [PM2](https://www.npmjs.com/package/pm2) because of its amazing logging and monitoring features.

If you are planing on running it "forever" too I highly recommend you to use it. All you've gotta do is install PM2 using `npm install -g pm2` and then run the main script with `pm2 start app.js`.

Please read [the whole documentation for PM2](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) if you're interested into the other awesome features they've got.

## License

Everything you need to know about the license is into the LICENSE file.

There is no copyright, feel free to do whatever you want with this.
Internet is free!
