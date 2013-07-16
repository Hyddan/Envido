window.Envido.Home = (function(Home) {
	Home.imageGalleryDataCallback = function(data) {
		Envido.UI.imageData['homeImageGallery'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['homeImageGallery'].push($(this));
		});
		
		return;
	};
	
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
		//Home.Elements.jqImageSlider = Envido.UI.createImageSlider(Home.Elements.divImageSliderContainer, 'data/homeImages.html', 'home', Home.imageSliderDataCallback);
		
		Envido.loadScript('js/load-image.js', function () {
			Envido.loadScript('js/jquery.image-gallery.js', function () {
				Home.Elements.jqImageGallery = Envido.UI.createImageGallery(Home.Elements.divImageGalleryContainer, 'data/homeImageGalleryImages.html', 'homeImageGallery', Home.imageGalleryDataCallback);
			});
		});
		
		//Hook up events
	};
	
	Home.Elements = (function(Elements) {
		Elements.divImageGalleryContainer = null;
		Elements.divImageSliderContainer = null;
		Elements.jqImageGallery = null;
		Elements.jqImageSlider = null;
		
		Elements.initialize = function() {
			Elements.divImageGalleryContainer = $('#divImageGalleryContainer');
			Elements.divImageSliderContainer = $('#divImageSliderContainer');
		};
		
		return Elements;
	}(Home.Elements || {}));
	
	Home.loadDependencies();
	
	return Home;
}(window.Envido.Home || {}));

Envido.selectedMenuItem = null;
Envido.ready(Envido.Home.initialize);