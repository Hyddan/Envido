window.Envido.GraphicalDesign = (function(GraphicalDesign) {
	GraphicalDesign.imageGalleryDataCallback = function(data) {
		Envido.UI.imageData['graphicalDesignImageGallery'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['graphicalDesignImageGallery'].push($(this));
		});
		
		return;
	};
	
	GraphicalDesign.focus = function (focus) {
		if ('gallery' !== focus && 'prints' !== focus) {
			return;
		}
		
		if('prints' === focus && 0 < GraphicalDesign.Elements.divPrintsContainer.children().length) {
			GraphicalDesign.Elements.liPrints.trigger('click');
			return;
		}
		
		if ('gallery' === focus && Envido.Utils.notNullOrEmpty(GraphicalDesign.Elements.jqImageGallery)) {
			var firstItem = GraphicalDesign.Elements.jqImageGallery.children()[0];
			if (Envido.Utils.notNullOrEmpty(firstItem)) {
				$(firstItem).trigger('click');
				return;
			}
		}
		
		setTimeout(function() { GraphicalDesign.focus(focus); }, 500);
	};
	
	GraphicalDesign.loadDependencies = function () {
		Envido.loadStyle('css/jquery.image-gallery.css', null);
		
		Envido.loadScript('js/jquery.slides.min.js', null);
	};
	
	GraphicalDesign.printsDataCallback = function(data) {
		$.each($(data), function(index) {
			GraphicalDesign.Elements.divPrintsContainer.append($(this));
		});
		
		return;
	};
	
	GraphicalDesign.initialize = function() {
		//Set initial values
		GraphicalDesign.Elements.initialize();
		GraphicalDesign.Elements.divImageGalleryContainer.show();
		GraphicalDesign.Elements.divPrintsContainer.hide();
		
		var focus = Envido.Utils.getQueryStringParameter('f');
		if (Envido.Utils.notNullOrEmpty(focus)) {
			GraphicalDesign.focus(focus);
		}
		
		//Create UI elements
		Envido.loadScript('js/load-image.js', function () {
			Envido.loadScript('js/jquery.image-gallery.js', function () {
				GraphicalDesign.Elements.jqImageGallery = Envido.UI.createImageGallery(GraphicalDesign.Elements.divImageGalleryContainer, 'data/graphicalDesignImageGalleryImages.html', 'graphicalDesignImageGallery', GraphicalDesign.imageGalleryDataCallback);
			});
		});
		
		Envido.callServer('data/graphicalDesignPrints.html', '', 'GET', 'html', GraphicalDesign.printsDataCallback, Envido.handleError);
		
		//Hook up events
		GraphicalDesign.Elements.liImageGallery.on('click', function () {
			GraphicalDesign.Elements.divPrintsContainer.hide();
			GraphicalDesign.Elements.divImageGalleryContainer.fadeIn();
		});
		
		GraphicalDesign.Elements.liPrints.on('click', function () {
			GraphicalDesign.Elements.divImageGalleryContainer.hide();
			GraphicalDesign.Elements.divPrintsContainer.fadeIn();
		});
	};
	
	GraphicalDesign.Elements = (function(Elements) {
		Elements.divImageGalleryContainer = null;
		Elements.divPrintsContainer = null;
		Elements.liImageGallery = null;
		Elements.liPrints = null;
		Elements.jqImageGallery = null;
		
		Elements.initialize = function() {
			Elements.divImageGalleryContainer = $('#divImageGalleryContainer');
			Elements.divPrintsContainer = $('#divPrintsContainer');
			Elements.liImageGallery = $('#liImageGallery');
			Elements.liPrints = $('#liPrints');
		};
		
		return Elements;
	}(GraphicalDesign.Elements || {}));
	
	GraphicalDesign.loadDependencies();
	
	return GraphicalDesign;
}(window.Envido.GraphicalDesign || {}));

Envido.selectedMenuItem = null;
Envido.ready(Envido.GraphicalDesign.initialize);