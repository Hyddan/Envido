window.Envido.AboutUs = (function(AboutUs) {
	AboutUs.loadDependencies = function () {
		Envido.loadStyle('css/aboutUs.css', null);
	};
	
	AboutUs.initialize = function() {
	};
	
	AboutUs.loadDependencies();
	
	return AboutUs;
}(window.Envido.AboutUs || {}));

Envido.selectedMenuItem = null;
Envido.ready(Envido.AboutUs.initialize);