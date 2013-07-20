#!/usr/local/bin/node

var fs = require('fs');
var argv = require('optimist')
    .usage('Usage: $0 --file [string]')
    .demand(['file'])
    .argv;


fs.readFile(argv.file, 'utf8', function(err, data) {
	if(err) throw err;
	
	var newData = data.valueOf();
	
	newData = newData.replace("<ORG>U.S. Bank<FID>1402</FI><INTU.BID>1402", "<ORG>AMEX<FID>3106</FI><INTU.BID>3106");
	
	fs.writeFile('download.qbo', newData, function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
});