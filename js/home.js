window.Envido.Home = (function(Home) {
	Home.imageSliderDataCallback = function(data) {
		Envido.UI.imageData['home'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['home'].push($(this));
		});
		
		return;
	};
	
	Home.loadDependencies = function() {
		Envido.loadScript('js/jquery.slides.min.js', null);
		Envido.loadScript('js/news.js', null);
		Envido.loadScript('js/showcase.js', null);
	};
	
	Home.initialize = function() {
		//Set initial values
		Home.Elements.initialize();
		
		//Create UI elements
		Home.Elements.jqImageSlider = Envido.UI.createImageSlider(Home.Elements.divImageSliderContainer, 'data/homeImages.html', 'home', Home.imageSliderDataCallback);
		
		//Hook up events
	};
	
	Home.Elements = (function(Elements) {
		Elements.divImageSliderContainer = null;
		Elements.jqImageSlider = null;
		
		Elements.initialize = function() {
			Elements.divImageSliderContainer = $('#divImageSliderContainer');
		};
		
		return Elements;
	}(Home.Elements || {}));
	
	Home.loadDependencies();
	
	return Home;
}(window.Envido.Home || {}));

Envido.selectedMenuItem = null;
Envido.ready(Envido.Home.initialize);