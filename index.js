#!/usr/local/bin/node

//Usage Example: ./index.js --file personal.qfx

var fs = require('fs');
var argv = require('optimist')
    .usage('Usage: $0 --file [string]')
    .demand(['file'])
    .argv;
var fileToConvert = argv.file;


fs.readFile(fileToConvert, 'utf8', function(err, data) {
	if(err) throw err;
	
	var newData = data.valueOf();
	
	newData = newData.replace("<ORG>U.S. Bank<FID>1402</FI><INTU.BID>1402", "<ORG>AMEX<FID>3106</FI><INTU.BID>3106");
	
	var newFileName = changeFileExtension(fileToConvert);
	
	fs.writeFile(newFileName, newData, function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
});

function changeFileExtension(inputFileName) {
	if(inputFileName.split('.').length >= 3 || typeof inputFileName !== "string") {
		throw "Error 3XS: Improper filename argument";
	}

	var oldFileName = inputFileName.split('.')[0];
	var newFileName = oldFileName + ".qbo";

	return newFileName;
}