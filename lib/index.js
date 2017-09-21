/**
 * author: kmorfin
 * date: 9/20/2017
 */

var __fs = require('fs');
var __checksum = require('checksum');
var __config = require('config');
var __regex = require('regex');
var __promise = require('promise');
var __jsonfile = require('jsonfile');


var jkchkSum = function(aUserCommand, aGlobalPath) {

	var commands = ['store', 'compare'];

	var regIgnore = new __regex('\\*');
	var sumSaveFile = 'checksum_results';

	if (__config.has('ignore')) {
		let ignoreRules = __config.get('ignore');
		regIgnore = new __regex(ignoreRules.join('|'));
	}

	if (__config.has('checksumFile')) {
		sumSaveFile = __config.get('checksumFile');
	}




	function recursiveRead(aCurrentCheckSum, aPath, currentChkSum) {
		return new __promise(function(resolve, reject) {
			var __totalChkSum = aCurrentCheckSum;
			var __currentChkSumObject = currentChkSum;
			var items = __fs.readdirSync(aPath);
			var data = 0;
			for (var i = 0; i < items.length; i++) {
				//if undefined do next
				if (typeof items[i] === 'undefined') {
					continue;
				}
				//if ignore rule do next
				if (regIgnore.test(items[i])) {
					continue;
				}
				let isDir = false;
				try {
					data = __fs.readFileSync(aPath + '\\' + items[i], {
						'encoding': 'utf-8'
					});
				} catch (err) {
					if (typeof err.code !== 'undefined' && err.code == 'EISDIR') {
						isDir = true;
					} else {
						reject(err);
					} //end of if
				} //end of catch

				if (!isDir) {
					let sum = __checksum(data);
					let bufStream = new Buffer(sum, 'utf-8');
					let fileSum = 0;
					for (var byteNum = 0; byteNum < bufStream.length; byteNum++) {
						fileSum += bufStream.readInt16BE(0);
					}
					__totalChkSum += fileSum;
					__currentChkSumObject[items[i]] = sum;
				} else {
					recursiveRead(__totalChkSum, aPath + '\\' + items[i], __currentChkSumObject);
				}
			} //end of for
			__currentChkSumObject.totalChkSum = __totalChkSum;
			resolve(__currentChkSumObject);
		}); //end of promise
	} //end of function


	//start reading
	var path = aGlobalPath;
	var userCommand = aUserCommand;
	var totalChecksum = 0;
	if (userCommand == commands[0]) {
		let promiseChk = recursiveRead(totalChecksum, path, {
			'totalChkSum': totalChecksum
		});
		promiseChk.then(results => {
			__jsonfile.writeFile(sumSaveFile, results, function(err) {
				if (err) {
					console.log(err);
				}
				console.log('done!!');
			});
		}).catch(reason => {
			console.log(reason);
			process.exit(1);
		});
	} else if (userCommand == commands[1]) {
		var previousChkSum = __jsonfile.readFileSync(sumSaveFile);
		let promiseChk = recursiveRead(totalChecksum, path, {
			'totalChkSum': totalChecksum
		});
		promiseChk.then(results => {
			let resultData = results;
			for (var prop in previousChkSum) {
				if (resultData.hasOwnProperty(prop)) {
					if (typeof resultData[prop] !== 'undefined') {
						if (resultData[prop] > previousChkSum[prop]) {
							resultData[prop] = resultData[prop] + '(->)';
						} else if (resultData[prop] < previousChkSum[prop]) {
							resultData[prop] = resultData[prop] + '(<-)';
						} else {
							if (prop != 'totalChkSum') {
								delete resultData[prop];
							}
						}
					} //end of if
				} //end of if
			} //end of for
			__jsonfile.writeFile(sumSaveFile, resultData, function(err) {
				if (err) {
					console.log(err);
				}
				console.log('done!!');
			});
		}).catch(reason => {
			console.log(reason);
			process.exit(1);
		});
	} else {
		console.log('command not supported:' + userCommand);
		process.exit(1);
	}
}; //end of module

exports.jkchksum = jkchkSum;
