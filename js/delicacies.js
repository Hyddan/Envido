window.Envido.Delicacies = (function(Delicacies) {
	Delicacies.imageSliderDataCallback = function(data) {
		Envido.UI.imageData['delicaciesImageSlider'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['delicaciesImageSlider'].push($(this));
			
			$(this).on('click', function () {
				if(Envido.Environment.Device.isMobile) {
					Envido.UI.createDialog('<img src="' + $(this).data('envido-url') + '" width="200" />', 200, 300);
					return;
				}
				
				Envido.UI.createDialog('<img src="' + $(this).data('envido-url') + '" width="480" />', 700, 510);
			});
		});
		
		return;
	};
	
	Delicacies.loadDependencies = function () {
		Envido.loadScript('js/jquery.slides.min.js', null);
	};
	
	Delicacies.initialize = function() {
		//Set initial values
		Delicacies.Elements.initialize();
		
		//Create UI elements
		Delicacies.Elements.jqImageSlider = Envido.UI.createImageSlider(Delicacies.Elements.divImageSliderContainer, 'data/delicaciesImageSliderImages.html', 'delicaciesImageSlider', 200, 140, Delicacies.imageSliderDataCallback);
		
		//Hook up events
	};
	
	Delicacies.Elements = (function(Elements) {
		Elements.divImageSliderContainer = null;
		Elements.jqImageSlider = null;
		
		Elements.initialize = function() {
			Elements.divImageSliderContainer = $('#divImageSliderContainer');
		};
		
		return Elements;
	}(Delicacies.Elements || {}));
	
	Delicacies.loadDependencies();
	
	return Delicacies;
}(window.Envido.Delicacies || {}));

Envido.ready(Envido.Delicacies.initialize);