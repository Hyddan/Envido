window.Envido.Delicacies = (function(Delicacies) {
	Delicacies.imageSliderDataCallback = function(data) {
		Envido.UI.imageData['delicaciesImageSlider'] = [];
		$.each($(data), function(index) {
			Envido.UI.imageData['delicaciesImageSlider'].push($(this));
			
			$(this).on('click', function () {
				var height = Envido.UI.windowHeight(),
					onClose = null,
					width = Envido.UI.windowWidth();
				
				var sizeAttribute = width >= height ? 'height="100%"' : 'width="100%"';
				
				if(Delicacies.stopSliderOnClick) {
					if(!Envido.Utils.notNullOrEmpty(Delicacies.Elements.jqImageSlider)) {
						Delicacies.Elements.jqImageSlider = Delicacies.Elements.divImageSliderContainer.slidesjs()[0];
					}
					Delicacies.Elements.jqImageSlider.stop();
					
					onClose = function () {
						Delicacies.Elements.jqImageSlider.play();
					}
				}
				
				Envido.UI.createDialog('<img ' + sizeAttribute + ' src="' + $(this).data('envido-url') + '"></img>', (height * .9), ((width * .9) < 970 ? (width * .9) : 970), onClose).css('text-align', 'center');
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
		
		Delicacies.stopSliderOnClick = false;
		
		//Create UI elements
		Envido.UI.createImageSlider(Delicacies.Elements.divImageSliderContainer, 'data/delicaciesImageSliderImages.html', 'delicaciesImageSlider', 200, 140, Delicacies.imageSliderDataCallback);
		
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