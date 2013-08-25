var express = require('express');
var app = express();

app.listen(3000);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(app.router);
});

app.use('/static', express.static(__dirname + '/'));

app.get('/', function(request, response) {
	response.send("<h1>Hello World</h1>");
});

app.post('/convert', function(req, res) {
	console.log(req.query);
	console.log(req.body);
	// res.setHeader('Content-Typeapplication/force-download');
	// res.setHeader('Content-Disposition', 'attachment;filename=shaheen.qbo');
	res.send(req.body);
});