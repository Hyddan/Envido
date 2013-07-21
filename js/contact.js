window.Envido.Contact = (function(Contact) {
	Contact.loadDependencies = function () {
		Envido.loadScript('//connect.facebook.net/en_US/all.js#xfbml=1', null);
	};
	
	Contact.initialize = function() {
	};
	
	Contact.loadDependencies();
	
	return Contact;
}(window.Envido.Contact || {}));

Envido.ready(Envido.Contact.initialize);