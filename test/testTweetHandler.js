'use strict';

const assert = require('assert');
const th = require('../lib/tweetHandler');

describe('tweetHandler', () => {
	describe('matchDivisionByZero()', () => {
		it('should match a division by zero in the operation', () => {
			assert(th.matchDivisionByZero('0/0'), 'handling no spaced operations');
			assert(th.matchDivisionByZero('1 / 0'), 'single-spaced operations');
			assert(th.matchDivisionByZero('2  /  0'), 'multi-spaced operations');
			assert(!(th.matchDivisionByZero('3  /  0.5')), 'zero-dot operations');
		});
	});

	describe('handle()', () => {
		it('should not divide by zero', () => {
			const mockedTweet = {
				user: {screen_name: 'test'},
				text: "@raspythagoras 1/1\n2/0.1\n0/0"
			};

			th.setLanguage({
				greetings: ['Hi'],
				divisionByZeroErrors: ['cant divide by zero']
			});

			th.handle(mockedTweet, (err, text) => {
				assert.equal(err, undefined);
				assert.equal(text, 'Hi @test, cant divide by zero');
			});
		});
	});
});