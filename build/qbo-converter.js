window.app = {css:{}}; //setup namespace

$(document).ready(function() {
	// Bootup Code
	app.setupCSS();
	
	// Do the file api
	app.setupFileAPI();
});

function download(filename, text) {
	//content = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv), //old way
	blob = new Blob([text], { type: 'application/vnd.intu.qbo' }); //new way
	var content = URL.createObjectURL(blob);
    var pom = document.createElement('a');
    pom.setAttribute('href', content);
    pom.setAttribute('download', filename);
    pom.click();
};

app.changeFileExtension = function(inputFileName) {
	if(inputFileName.split('.').length >= 3 || typeof inputFileName !== "string") {
		throw "Error 3XS: Improper filename argument";
	}

	var oldFileName = inputFileName.split('.')[0];
	var newFileName = oldFileName + ".qbo";

	return newFileName;
};

app.convertFile = function(file) {
	// Define Constants
	var ORG = "<ORG>";
	var FID = "<FID>";
	var FI = "</FI>";
	var INTU = "<INTU.BID>";
	var SONRS = "</SONRS>";
	var NEW_BANK = "AMEX";
	var NEW_FID = "3106";
	var NEW_INTU = "3106";

	//Replace Bank Name
	var orgPlaceholder = file.search(ORG);
	var fidPlaceholder = file.search(FID);
	file = file.substring(0, orgPlaceholder + ORG.length) + NEW_BANK + file.substring(fidPlaceholder, file.length);

	//Replace FID Code
	var fidPlaceholder = file.search(FID);
	var fiPlaceholder  = file.search(FI);
	file = file.substring(0, fidPlaceholder + FID.length) + NEW_FID + file.substring(fiPlaceholder, file.length);

	// Replace INTU Code
	var intuPlaceholder = file.search(INTU);
	var sonrsPlaceholder = file.search(SONRS);
	file = file.substring(0, intuPlaceholder + INTU.length) + NEW_INTU + file.substring(sonrsPlaceholder, file.length);

	return file; 
};

app.handleFileSelect = function(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.
	
	for (var i = 0, f; f = files[i]; i++) {
		if(app.getFileExtension(f.name) === "qfx") {
            // Track usage event
            _gaq.push(['_trackEvent', 'FileConverted', app.getFileExtension(f.name)]);
            
			window.fileName = f.name; // Totally hacky
			
			app.infoSign.newMessage(f.name);

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function(theFile) {
				return function(e) {
					var convertedFile = app.convertFile(e.target.result);

					app.infoSign.newMessage("You're conversion was successful. Your file will be downloaded.");
					download(app.changeFileExtension(window.fileName), convertedFile);
				};
			})(f);

			// Read in the image file as a data URL.
			reader.readAsText(f);
		} else {
            _gaq.push(['_trackEvent', 'FileNotConverted', app.getFileExtension(f.name)]);
            
			app.infoSign.newMessage('This app only supports converting qfx files. You dragged in a ' + app.getFileExtension(f.name) + ' file.');
		}
	}
};

app.getFileExtension = function(fileName) {
	var fileExtension = fileName.split('.')[fileName.split('.').length - 1];
    fileExtension = fileExtension.toLowerCase();
    return fileExtension;
};

app.resizeWindow = function() {
	app.css.windowHeight = $(window).height();
	app.css.windowWidth = $(window).width();
	
	// Setup main div
	app.css.$wrapper.css({height:app.css.windowHeight});
	
	// Setup input form
	formLeft = (app.css.windowWidth / 2) - (app.css.$inputForm.width() /2);
};

app.handleDragOver = function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
};

app.setupFileAPI = function() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Setup the dnd listeners.
	    var dropZone = document.getElementById('input-form');
	    dropZone.addEventListener('dragover', app.handleDragOver, false);
	    dropZone.addEventListener('drop', app.handleFileSelect, false);
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
};

app.setupCSS = function() {
	// Cache jQuery
	app.css.$wrapper = $("#wrapper");
	app.css.$inputForm = $('#input-form');
	app.css.$infoSign = $('#info-sign');
	
	app.resizeWindow();
	
	$(window).resize(function() {
		app.resizeWindow();
	});
	
	app.css.$infoSign.css({top:"77px"});
	
	$('body').click(function(evt) {
		app.infoSign.close();
	});
};
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