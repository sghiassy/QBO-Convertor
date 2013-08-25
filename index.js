function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</li>');
	}

	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

$(document).ready(function() {
	//Bootup Code
	window.app = {css:{}}; //setup namespace
	app.css.windowHeight = $(window).height();
	app.css.windowWidth = $(window).width();
	app.css.$wrapper = $("#wrapper");
	app.css.$inputForm = $('#input-form');
	
	//Setup main div
	app.css.$wrapper.css({height:app.css.windowHeight});
	
	//Setup input form
	formLeft = (app.css.windowWidth / 2) - (app.css.$inputForm.width() /2);
	app.css.$inputForm.css({left:formLeft});
	
	//Do the file api
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Setup the dnd listeners.
	    var dropZone = document.getElementById('drop-zone');
	    dropZone.addEventListener('dragover', handleDragOver, false);
	    dropZone.addEventListener('drop', handleFileSelect, false);
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
});

