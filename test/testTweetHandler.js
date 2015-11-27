'use strict';

const assert = require('assert');
const th = require('../lib/tweetHandler');

describe('tweetHandler', function () {
	describe('matchDivisionByZero()', function () {
		it('should match a division by zero in the operation', function () {
			assert(th.matchDivisionByZero('0/0'));
			assert(th.matchDivisionByZero('1 / 0'));
			assert(th.matchDivisionByZero('2  /  0'));
			assert(th.matchDivisionByZero('3  /  0.5'));
		});
	});
});