window.Envido.Home = (function(Home) {
	Home.loadDependencies = function() {
		Envido.loadScript('js/jquery.slides.min.js', null);
		Envido.loadScript('js/news.js', null);
	};
	
	Home.initialize = function() {
		//Set initial values
		Home.Elements.initialize();
		
		//Create UI elements
		
		//Hook up events
	};
	
	Home.Elements = (function(Elements) {		
		Elements.initialize = function() {
		};
		
		return Elements;
	}(Home.Elements || {}));
	
	Home.loadDependencies();
	
	return Home;
}(window.Envido.Home || {}));

Envido.selectedMenuItem = null;
Envido.ready(Envido.Home.initialize);