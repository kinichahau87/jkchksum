#!/usr/bin/env node

var jschksumlib = require('../lib/index.js');

if (process.argv.length <= 3) {
	console.log(`usage: ${__filename} command path/to/dir`);
	process.exit(1);
} else {  
	jschksumlib.jkchksum(process.argv[2], process.argv[3]);
}
