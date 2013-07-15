window.Envido.Showcase = (function(Showcase) {
	Showcase.UI = (function(UI) {
		UI.insertNewsOnPage = function(data) {
			$('#showcasePlaceHolder').html(data);

			//Hook up events
			$('.liShowcase').each(function (index) {
				$(this).on('click', function () {
					if(Envido.Environment.Device.isMobile) {
						//window.open($(this).data('envido-url'));
						Envido.UI.createDialog('<img height="100" src="' + $(this).data('envido-url') + '" width="200" />', 200, 300);
						return;
					}
					
					Envido.UI.createDialog('<img height="360" src="' + $(this).data('envido-url') + '" width="640" />', 430, 700);
				});
			});
		};	
		
		return UI;
	}(Showcase.UI || {}));
	
	Showcase.initialize = function() {
		Envido.callServer('data/showcase.html', '', 'GET', 'html', Showcase.UI.insertNewsOnPage, Envido.handleError);
	};
	
	return Showcase;
}(window.Envido.Showcase || {}));

Envido.ready(Envido.Showcase.initialize);