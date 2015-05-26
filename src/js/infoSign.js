app.infoSign = {};
app.errorSign = {};

app.errorSign.newMessage = function(message) {
	app.css.$infoSign.css({'backgroundColor': '#DF3838', 'color': 'white'});
	app.infoSign.postMessage(message);
};

app.infoSign.newMessage = function(message) {
	app.css.$infoSign.css({'backgroundColor': '#E7FF17', 'color': 'rgb(116,9,9)'});
	app.infoSign.postMessage(message);
};

app.infoSign.postMessage = function(message) {
	app.css.$infoSign.css({zIndex: -1});
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
