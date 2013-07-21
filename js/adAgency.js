window.Envido.AdAgency = (function(AdAgency) {
	AdAgency.imageGalleryDataCallback = function(data) {
		Envido.UI.imageData['adAgencyImageGallery'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['adAgencyImageGallery'].push($(this));
		});
		
		return;
	};
	
	AdAgency.focus = function (focus) {
		if ('distributions' !== focus && 'information' !== focus && 'gallery' !== focus && 'prints' !== focus) {
			return;
		}
		
		if('information' === focus && 0 < AdAgency.Elements.divInformationContainer.children().length) {
			AdAgency.Elements.liInformation.trigger('click');
			return;
		}
		
		if('distributions' === focus && 0 < AdAgency.Elements.divDistributionsContainer.children().length) {
			AdAgency.Elements.liDistributions.trigger('click');
			return;
		}
		
		if('prints' === focus && 0 < AdAgency.Elements.divPrintsContainer.children().length) {
			AdAgency.Elements.liPrints.trigger('click');
			return;
		}
		
		if ('gallery' === focus && Envido.Utils.notNullOrEmpty(AdAgency.Elements.jqImageGallery)) {
			var firstItem = AdAgency.Elements.jqImageGallery.children()[0];
			if (Envido.Utils.notNullOrEmpty(firstItem)) {
				$(firstItem).trigger('click');
				return;
			}
		}
		
		setTimeout(function() { AdAgency.focus(focus); }, 500);
	};
	
	AdAgency.loadDependencies = function () {
		Envido.loadStyle('css/jquery.image-gallery.css', null);
	};
	
	AdAgency.printsDataCallback = function(data) {
		$.each($(data), function(index) {
			AdAgency.Elements.divPrintsContainer.append($(this));
		});
		
		return;
	};
	
	AdAgency.initialize = function() {
		//Set initial values
		AdAgency.Elements.initialize();
		AdAgency.Elements.divInformationContainer.show();
		AdAgency.Elements.divImageGalleryContainer.hide();
		AdAgency.Elements.divDistributionsContainer.hide();
		AdAgency.Elements.divPrintsContainer.hide();
		
		var focus = Envido.Utils.getQueryStringParameter('f');
		if (Envido.Utils.notNullOrEmpty(focus)) {
			AdAgency.focus(focus);
		}
		
		//Create UI elements
		Envido.loadScript('js/load-image.js', function () {
			Envido.loadScript('js/jquery.image-gallery.js', function () {
				AdAgency.Elements.jqImageGallery = Envido.UI.createImageGallery(AdAgency.Elements.divImageGalleryContainer, 'data/adAgencyImageGalleryImages.html', 'adAgencyImageGallery', AdAgency.imageGalleryDataCallback);
			});
		});
		
		Envido.callServer('data/adAgencyPrints.html', '', 'GET', 'html', AdAgency.printsDataCallback, Envido.handleError);
		
		//Hook up events
		AdAgency.Elements.liDistributions.on('click', function () {
			AdAgency.Elements.divImageGalleryContainer.hide();
			AdAgency.Elements.divInformationContainer.hide();
			AdAgency.Elements.divPrintsContainer.hide();
			AdAgency.Elements.divDistributionsContainer.fadeIn();
		});
		
		AdAgency.Elements.liImageGallery.on('click', function () {
			AdAgency.Elements.divDistributionsContainer.hide();
			AdAgency.Elements.divInformationContainer.hide();
			AdAgency.Elements.divPrintsContainer.hide();
			AdAgency.Elements.divImageGalleryContainer.fadeIn();
		});
		
		AdAgency.Elements.liInformation.on('click', function () {
			AdAgency.Elements.divDistributionsContainer.hide();
			AdAgency.Elements.divImageGalleryContainer.hide();
			AdAgency.Elements.divPrintsContainer.hide();
			AdAgency.Elements.divInformationContainer.fadeIn();
		});
		
		AdAgency.Elements.liPrints.on('click', function () {
			AdAgency.Elements.divDistributionsContainer.hide();
			AdAgency.Elements.divImageGalleryContainer.hide();
			AdAgency.Elements.divInformationContainer.hide();
			AdAgency.Elements.divPrintsContainer.fadeIn();
		});
	};
	
	AdAgency.Elements = (function(Elements) {
		Elements.divDistributionsContainer = null;
		Elements.divImageGalleryContainer = null;
		Elements.divInformationContainer = null;
		Elements.divPrintsContainer = null;
		Elements.liDistributions = null;
		Elements.liImageGallery = null;
		Elements.liInformation = null;
		Elements.liPrints = null;
		Elements.jqImageGallery = null;
		
		Elements.initialize = function() {
			Elements.divDistributionsContainer = $('#divDistributionsContainer');
			Elements.divImageGalleryContainer = $('#divImageGalleryContainer');
			Elements.divInformationContainer = $('#divInformationContainer');
			Elements.divPrintsContainer = $('#divPrintsContainer');
			Elements.liDistributions = $('#liDistributions');
			Elements.liImageGallery = $('#liImageGallery');
			Elements.liInformation = $('#liInformation');
			Elements.liPrints = $('#liPrints');
		};
		
		return Elements;
	}(AdAgency.Elements || {}));
	
	AdAgency.loadDependencies();
	
	return AdAgency;
}(window.Envido.AdAgency || {}));

Envido.selectedMenuItem = null;
Envido.ready(Envido.AdAgency.initialize);