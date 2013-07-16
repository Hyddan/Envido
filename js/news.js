window.Envido.News = (function(News) {
	News.UI = (function(UI) {
		UI.insertNewsOnPage = function(data) {
			$('#newsPlaceHolder').html(data);

			//Hook up events
			$('.anchor').each(function (index) {
				$(this).on('click', function () {
					if(Envido.Environment.Device.isMobile) {
						window.open($(this).data('envido-url'));
					}
					else {
						Envido.UI.createDialog('<iframe height="' + ($(window).height() - 200) + '" src="' + $(this).data('envido-url') + '" width="' + ($(window).width() - 200) + '"></iframe>', $(window).height() - 100, $(window).width() - 100);
					}
				});
			});
		};	
		
		return UI;
	}(News.UI || {}));
	
	News.initialize = function() {
		Envido.callServer('data/news.html', '', 'GET', 'html', News.UI.insertNewsOnPage, Envido.handleError);
	};
	
	return News;
}(window.Envido.News || {}));

Envido.ready(Envido.News.initialize);