app.infoSign = {};

app.infoSign.newMessage = function(message) {
	app.css.$infoSign.html(message);
	
	app.css.$infoSign.animate({
		top: "0px",
		zIndex: 1
	}, 500, function() {
		// Animation complete.
	});
};


app.infoSign.close = function() {
	app.css.$infoSign.css({zIndex: -1});
	app.css.$infoSign.animate({
		top: "77px",
	}, 500, function() {
		// Animation complete.
	});
};