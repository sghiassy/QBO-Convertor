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
	var downloadElement = document.createElement('a');
	downloadElement.setAttribute('href', content);
	downloadElement.setAttribute('download', filename);
	$(downloadElement).html("Click to download");
	// $(document.body).append(downloadElement); If you uncomment this line, it should work in newer versions of Firefox (but I don't want to support multiple browsers)
	downloadElement.click();
};

app.changeFileExtension = function(inputFileName) {
	if(typeof inputFileName !== "string") {
		var errorString = "Error 2WXS: There was a problem parsing your filename. Try renaming it";
		app.infoSign.newMessage(errorString);
		_gaq.push(['_trackEvent', 'BadFileName', inputFileName]);
		throw errorString;
	}

	var oldFileNameArray = inputFileName.split('.');
	oldFileNameArray.pop(); // remove the last part of the array (presumably the file extension)
	var oldFileName = oldFileNameArray.join(".");
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
	// Check for browser compatibility before proceeding forward (i.e. only supporting Chrome for now)
	var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (!isChrome) {
		app.infoSign.newMessage("This app only works with Google Chrome. Please see the message in the top-right");
		_gaq.push(['_trackEvent', 'BadBrowserAttempt']);
		return;
	}

	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.
	
	for (var i = 0, f; f = files[i]; i++) {
		if(app.getFileExtension(f.name) === "qfx") {
			var currentFile = f; // renaming the stupid variable name 'f'

			// Track usage event
			_gaq.push(['_trackEvent', 'FileConverted', app.getFileExtension(currentFile.name)]);

			window.scg = {
				fileName: app.changeFileExtension(currentFile.name)
			}; // Totally hacky way to get around closure below

			app.infoSign.newMessage(currentFile.name);

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function() {
				return function(evt) {
					// note: In here, this = FileReader
					var convertedFile = app.convertFile(evt.target.result);
					var theFile = window.scg.fileName || undefined;

					if (theFile) {
						app.infoSign.newMessage("You're conversion was successful. Your file will be in the 'downloads' folder, as defined in your browser's settings");
						download(theFile, convertedFile);
					} else {
						app.infoSign.newMessage("Error 6TFG: The filename was missing");
						_gaq.push(['_trackEvent', 'FileMissing']);
					}
				};
			})();

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