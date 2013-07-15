window.Envido.GraphicalDesign = (function(GraphicalDesign) {
	GraphicalDesign.imageGalleryDataCallback = function(data) {
		Envido.UI.imageData['graphicalDesignImageGallery'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['graphicalDesignImageGallery'].push($(this));
		});
		
		return;
	};
	
	GraphicalDesign.focus = function (focus) {
		if ('gallery' !== focus) {
			return;
		}
		
		if (Envido.Utils.notNullOrEmpty(GraphicalDesign.Elements.jqImageGallery)) {
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
	
	GraphicalDesign.initialize = function() {
		//Set initial values
		GraphicalDesign.Elements.initialize();
		GraphicalDesign.Elements.divImageGalleryContainer.show();
		GraphicalDesign.Elements.divPrintedMaterialContainer.hide();
		
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
		
		//Hook up events
		GraphicalDesign.Elements.liImageGallery.on('click', function () {
			GraphicalDesign.Elements.divPrintedMaterialContainer.hide();
			GraphicalDesign.Elements.divImageGalleryContainer.fadeIn();
		});
		
		GraphicalDesign.Elements.liPrintedMaterial.on('click', function () {
			GraphicalDesign.Elements.divImageGalleryContainer.hide();
			GraphicalDesign.Elements.divPrintedMaterialContainer.fadeIn();
		});
	};
	
	GraphicalDesign.Elements = (function(Elements) {
		Elements.divImageGalleryContainer = null;
		Elements.divPrintedMaterialContainer = null;
		Elements.liImageGallery = null;
		Elements.liPrintedMaterial = null;
		Elements.jqImageGallery = null;
		
		Elements.initialize = function() {
			Elements.divImageGalleryContainer = $('#divImageGalleryContainer');
			Elements.divPrintedMaterialContainer = $('#divPrintedMaterialContainer');
			Elements.liImageGallery = $('#liImageGallery');
			Elements.liPrintedMaterial = $('#liPrintedMaterial');
		};
		
		return Elements;
	}(GraphicalDesign.Elements || {}));
	
	GraphicalDesign.loadDependencies();
	
	return GraphicalDesign;
}(window.Envido.GraphicalDesign || {}));

Envido.selectedMenuItem = null;
Envido.ready(Envido.GraphicalDesign.initialize);