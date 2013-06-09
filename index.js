var fs = require('fs');

fs.readFile('checking.qfx', 'utf8', function(err, data) {
	if(err) throw err;
	
	var newData = data.valueOf();
	
	newData = newData.replace("<ORG>U.S. Bank<FID>1402</FI><INTU.BID>1402", "<ORG>AMEX<FID>3106</FI><INTU.BID>3106");
	
	fs.writeFile('checking.qbo', newData, function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
});