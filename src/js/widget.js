import iframeLayout from '../html/iframe.html';
import Postmate from 'postmate';

  	console.log("L7 spinning up MagicWidget in widget mode");

  	/*
		@todo need to get parent page params and pass them on through to child iframe.html 
		to allow child to instantiate the widget within the iframe 😀 
	*/

	const div = document.createElement('div');
	div.id = 'rcWidget';
	document.body.appendChild(div);

	//callback for iframe init
	function funky(data) {
		console.log('funky()');
		console.log(data);

		// here for document.getElementById("peace").className = "be-still"

		if (data.the_world.sticky) {
			//div is an ugly global at the mo
			div.className = data.the_world.sticky;
		}
		
		if (data.the_world.cssFile) {
			// another func for addCss incase of in future white label (no css e.g) 
			addCss(data.the_world.cssFile);
		}

	};


	function expanding(child, data) {
		console.log('expanding()');
		console.log(data);

		child.get('height')
		    .then(height => console.log({height}));
		  
	};


	//callback to inject css into parent page
	function addCss(fileName) {
	  var head = document.head;
	  var link = document.createElement("link");

	  link.type = "text/css";
	  link.rel = "stylesheet";
	  link.href = fileName;

	  head.appendChild(link);

	  console.log('Appended CSS file: '+ fileName);
	}


	// Kick off the handshake with the iFrame
	const handshake = new Postmate({
	  container: document.getElementById('rcWidget'), // Element to inject frame into
	  url: '/iframe.html' // Page to load, must have postmate.js. This will also be the origin used for communication.
	});

	// When parent <-> child handshake is complete, data may be requested from the child
	handshake.then(child => {

	  // Fetch the height property in child.html and set it to the iFrames height
	  child.get('height')
	    .then(height => child.frame.style.height = `${height}px`)
	    .then(id => child.frame.id = 'rcIframe')
	    .then(border => child.frame.style.border = '0');

	  // Listen to a particular event from the child
	  child.on('init', 
	  	data => funky(data)	
	  ); 

	  child.on('expand', 
	  	data => expanding(child, data)	
	  ); 

	  child.on('collapse', 
	  	data => collapsing(child, data)	
	  ); 

	});