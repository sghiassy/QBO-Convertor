window.app = {css:{}}; //setup namespace

app.handleFileSelect = function(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</li>');
	}
	
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	
	for (var i = 0, f; f = files[i]; i++) {
		//Only process image files.
		//if (!f.type.match('image.*')) {
			//continue;
		//}

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				console.log(e.target.result);
				$('#list').html('<pre>' + e.target.result + '</pre>');
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
	}
};

app.handleDragOver = function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

app.setupFileAPI = function() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Setup the dnd listeners.
	    var dropZone = document.getElementById('drop-zone');
	    dropZone.addEventListener('dragover', app.handleDragOver, false);
	    dropZone.addEventListener('drop', app.handleFileSelect, false);
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
};

app.setupCSS = function() {
	//Cache jQuery
	app.css.windowHeight = $(window).height();
	app.css.windowWidth = $(window).width();
	app.css.$wrapper = $("#wrapper");
	app.css.$inputForm = $('#input-form');
	
	//Setup main div
	app.css.$wrapper.css({height:app.css.windowHeight});
	
	//Setup input form
	formLeft = (app.css.windowWidth / 2) - (app.css.$inputForm.width() /2);
	app.css.$inputForm.css({left:formLeft});
};

$(document).ready(function() {
	//Bootup Code
	app.setupCSS();
	
	//Do the file api
	app.setupFileAPI();
});

