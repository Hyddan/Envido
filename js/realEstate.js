window.Envido.RealEstate = (function(RealEstate) {
	RealEstate.imageGalleryDataCallback = function(data) {
		Envido.UI.imageData['realEstateImageGallery'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['realEstateImageGallery'].push($(this));
		});
		
		return;
	};
	
	RealEstate.loadDependencies = function () {
		Envido.loadStyle('css/jquery.image-gallery.css', null);
		Envido.loadStyle('css/realEstate.css', null);
	};
	
	RealEstate.initialize = function() {
		//Set initial values
		RealEstate.Elements.initialize();
		
		//Create UI elements
		Envido.loadScript('js/load-image.js', function () {
			Envido.loadScript('js/jquery.image-gallery.js', function () {
				RealEstate.Elements.jqImageGallery = Envido.UI.createImageGallery(RealEstate.Elements.divImageGalleryContainer, 'data/realEstateImageGalleryImages.html', 'realEstateImageGallery', RealEstate.imageGalleryDataCallback);
			});
		});
		
		//Hook up events
	};
	
	RealEstate.Elements = (function(Elements) {
		Elements.divImageGalleryContainer = null;
		Elements.jqImageGallery = null;
		
		Elements.initialize = function() {
			Elements.divImageGalleryContainer = $('#divImageGalleryContainer');
		};
		
		return Elements;
	}(RealEstate.Elements || {}));
	
	RealEstate.loadDependencies();
	
	return RealEstate;
}(window.Envido.RealEstate || {}));

Envido.ready(Envido.RealEstate.initialize);