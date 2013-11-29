window.Envido.Articles = (function(Articles) {
	Articles.UI = (function(UI) {
		UI.insertNavigationOnPage = function(data) {
			$('.navigationPlaceHolder').html(data);

			//Hook up events
			$('.inTextAnchor, .navigationAnchor').each(function (index) {
				$(this).on('click', function () {
					window.location.href = $(this).data('envido-url');
				});
			});
		};	
		
		return UI;
	}(Articles.UI || {}));
	
	Articles.initialize = function() {
		Envido.callServer('navigation.html', '', 'GET', 'html', Articles.UI.insertNavigationOnPage, Envido.handleError);
	};
	
	return Articles;
}(window.Envido.Articles || {}));

Envido.ready(Envido.Articles.initialize);