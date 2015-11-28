'use strict';
const assert = require('chai').assert;
const tweetHandler = require('../lib/tweetHandler');
const dictionary = require('../configs/language');
const sinon = require('sinon');

let sandbox = sinon.sandbox.create();
let fakeTweet = {text: 'Fake text.\n2+2.\n4+4.', user: {screen_name: 'FakeUser'}};

describe('tweetHandler Tests', () => {
	afterEach(() => {
		sandbox.restore();
	});

	describe('setLanguage', () => {
		it('should set the dictionary property', () => {
			let fakeDictionary = {mock: 'This is a fake dictionary.'};
			tweetHandler.setLanguage(fakeDictionary);
			assert.deepEqual(tweetHandler.dictionary, fakeDictionary);

			tweetHandler.setLanguage(dictionary.en);
			assert.deepEqual(tweetHandler.dictionary, dictionary.en);
		});
	});

	describe('handle', () => {
		it('should call getOperations with tweet\'s text', () => {
			let spy = sandbox.spy(tweetHandler, 'getOperations');

			tweetHandler.handle(fakeTweet, (error, responseText) => {
				assert.isTrue(spy.calledWithExactly('Fake text.\n2+2.\n4+4.'));
			});
		});

		it('should call calculateResults with tweet\'s operations', () => {
			let spy = sandbox.spy(tweetHandler, 'calculateResults');

			tweetHandler.handle(fakeTweet, (error, responseText) => {
				assert.isTrue(spy.calledWithExactly(['2+2', '4+4']));
			});
		});

		it('should call createResponse with screen_name and operations/results array', () => {
			let spy = sandbox.spy(tweetHandler, 'createResponse');
			let operationsAndResults = [{operation: '2+2', result: 4}, {operation: '4+4', result: 8}];

			tweetHandler.handle(fakeTweet, (error, responseText) => {
				assert.isTrue(spy.calledWithExactly('FakeUser', operationsAndResults));
			});
		});

		it('should callback with error and undefined response if calculateResults fails', () => {
			let fakeError = new Error('Fake error.');
			sandbox.stub(tweetHandler, 'calculateResults').throws(fakeError);

			tweetHandler.handle(fakeTweet, (error, responseText) => {
				assert.deepEqual(error, fakeError);
				assert.strictEqual(responseText, undefined);
			});
		});

		it('should callback with error and undefined response if createResponse fails', () => {
			let fakeError = new Error('Fake error.');
			sandbox.stub(tweetHandler, 'createResponse').throws(fakeError);

			tweetHandler.handle(fakeTweet, (error, responseText) => {
				assert.deepEqual(error, fakeError);
				assert.strictEqual(responseText, undefined);
			});
		});
	});

	describe('getOperations', () => {
		it('should return an empty array if no operations are found on text', () => {
			let foundOperations = tweetHandler.getOperations('Text without operations.');

			assert.strictEqual(foundOperations.length, 0);
		});

		it('should return an array containing operations found on text', () => {
			let foundOperations = tweetHandler.getOperations(fakeTweet.text);

			assert.sameMembers(foundOperations, ['2+2', '4+4']);
		});
	});

	describe('calculateResults', () => {
		it('should throw error if one of the operations results is \'NaN\'', () => {
			let operations = ['2+2', '0/0'];

			assert.throws(() => {tweetHandler.calculateResults(operations)});
		});

		it('should throw error if one of the operations results is \'Infinity\'', () => {
			let operations = ['2+2', '4/0'];

			assert.throws(() => {tweetHandler.calculateResults(operations)});
		});

		it('should return an array containing operations and their results', () => {
			let operations = ['2+2', '4/4'];
			let expectedResults = [{operation: '2+2', result: 4}, {operation: '4/4', result: 1}];
			let results = tweetHandler.calculateResults(operations);

			assert.sameDeepMembers(results, expectedResults);
		});
	});
});