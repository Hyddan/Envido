window.Envido.RealEstate = (function(RealEstate) {
	RealEstate.imageDataIndex = 'realEstateImageGallery';
	RealEstate.pageIndex = null;
	RealEstate.pageSize = null;
	RealEstate.pageData = null;
	
	RealEstate.Callbacks = (function (Callbacks) {
		Callbacks.imageGallery = function (data) {
			RealEstate.pageData = [];
			$.each($(data), function (index) {
				if ($(this).is('a')) {
					RealEstate.pageData.push($(this));
				}
			});
			
			RealEstate.imageCount = parseInt(RealEstate.pageData.length, 10) == 0 ? 1 : parseInt(RealEstate.pageData.length, 10);
			
			RealEstate.UI.createImageGallery();
		};
		
		return Callbacks;
	}(RealEstate.Callbacks || {}));
	
	RealEstate.Elements = (function(Elements) {
		Elements.divImageGalleryContainer = null;
		Elements.divPagination = null;
		Elements.jqImageGallery = null;
		
		Elements.initialize = function() {
			for (var key in this) {
				if ('function' !== typeof this[key]) {
					this[key] = $('#' + key);
				}
			}
		};
		
		return Elements;
	}(RealEstate.Elements || {}));
	
	RealEstate.Events = (function (Events) {
		Events.onPageChanged = function (page) {
			RealEstate.pageIndex = page || RealEstate.pageIndex;
			
			RealEstate.UI.createImageGallery();
		};
		
		return Events;
	}(RealEstate.Events || {}));
	
	RealEstate.UI = (function (UI) {
		UI.createImageGallery = function () {
			Envido.UI.imageData[RealEstate.imageDataIndex] = [];
			for (var i = (RealEstate.pageIndex - 1) * RealEstate.pageSize;  i < RealEstate.pageSize + ((RealEstate.pageIndex - 1) * RealEstate.pageSize); i++) {
				Envido.UI.imageData[RealEstate.imageDataIndex].push(RealEstate.pageData[i]);
			}
			
			var _isActive = false;
			try {
				_isActive = 0 < RealEstate.Elements.divImageGalleryContainer.children().length;
			}
			catch (ex) {
				_isActive = false;
			}
			
			if (_isActive) {
				RealEstate.Elements.divImageGalleryContainer.empty();
			}
			
			RealEstate.Elements.jqImageGallery = Envido.UI.createPagedImageGallery(RealEstate.Elements.divImageGalleryContainer, RealEstate.imageDataIndex);
		};
		
		UI.paginate = function (pageIndex) {	
			RealEstate.pageIndex = pageIndex || RealEstate.pageIndex;
			
			if (RealEstate.imageCount) {
				if (RealEstate.Elements.divPagination.hasClass('jPaginate')) {
					RealEstate.Elements.divPagination.removeClass('jPaginate');
					RealEstate.Elements.divPagination.attr('style', '');
					RealEstate.Elements.divPagination.html('');
				}
				
				RealEstate.Elements.divPagination.paginate({
					count 					: Math.ceil((RealEstate.imageCount / RealEstate.pageSize)),
					start 					: RealEstate.pageIndex,
					display     			: 5,
					border					: false,
					text_color  			: 'white',
					background_color    	: 'black',
					text_hover_color  		: 'red',
					background_hover_color	: '#000',
					images					: false,
					mouse					: 'press',
					onChange				: RealEstate.Events.onPageChanged
				});
			}
			else {
				setTimeout(UI.paginate, 500);
			}
		};
		
		return UI;
	}(RealEstate.UI || {}));
	
	RealEstate.initialize = function() {
		RealEstate.pageIndex = 1;
		RealEstate.pageSize = 20;
		
		//Set initial values
		RealEstate.Elements.initialize();
		
		//Create UI elements
		Envido.Utils.delay.call(this, function () {
			Envido.loadScript('../lib/load-image.js', function () {
				Envido.loadScript('../lib/jquery.image-gallery.js', function () {
					Envido.loadScript('../lib/jquery.paginate.js', function () {
						Envido.callServer('data/realEstateImageGalleryImages.html', '', 'GET', 'html', RealEstate.Callbacks.imageGallery, Envido.handleError);
					});
				});
			});
		}, 'obj => !Envido.Utils.notNullOrUndefinedFunction(obj.widget)', $, 1);
		
		RealEstate.UI.paginate(1);
		
		//Hook up events
	};
	
	RealEstate.loadDependencies = function () {
		Envido.loadStyle('../css/jquery.image-gallery.css', null);
		Envido.loadStyle('../lib/jquery.paginate.styles.css', null);
		Envido.loadStyle('../css/realEstate.css', null);
	};
	
	RealEstate.loadDependencies();
	
	return RealEstate;
}(window.Envido.RealEstate || {}));

Envido.ready(Envido.RealEstate.initialize);