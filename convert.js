#!/usr/local/bin/node

//Usage Example: ./convert.js --file personal.qfx

var fs = require('fs');
var argv = require('optimist')
    .usage('Usage: $0 --file [string]')
    .demand(['file'])
    .argv;
var fileToConvert = argv.file;

//Define Constants
var ORG = "<ORG>";
var FID = "<FID>";
var FI = "</FI>";
var INTU = "<INTU.BID>";
var SONRS = "</SONRS>";
var NEW_BANK = "AMEX";
var NEW_FID = "3106";
var NEW_INTU = "3106";


fs.readFile(fileToConvert, 'utf8', function(err, data) {
	if(err) throw err;

	//Grab file data as a string
	var file = data.valueOf();

	//Replace Bank Name
	var orgPlaceholder = file.search(ORG);
	var fidPlaceholder = file.search(FID);
	file = file.substring(0, orgPlaceholder + ORG.length) + NEW_BANK + file.substring(fidPlaceholder, file.length);

	//Replace FID Code
	var fidPlaceholder = file.search(FID);
	var fiPlaceholder  = file.search(FI);
	file = file.substring(0, fidPlaceholder + FID.length) + NEW_FID + file.substring(fiPlaceholder, file.length);

	//Replace INTU Code
	var intuPlaceholder = file.search(INTU);
	var sonrsPlaceholder = file.search(SONRS);
	file = file.substring(0, intuPlaceholder + INTU.length) + NEW_INTU + file.substring(sonrsPlaceholder, file.length);

	var newFileName = changeFileExtension(fileToConvert);
	
	fs.writeFile(newFileName, file, function (err) {
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