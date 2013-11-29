window.Envido.Menu = (function (Menu) {
	Menu.UI = (function (UI) {
		UI.insertMenuOnPage = function (data) {
			$('.menuPlaceHolder').each(function (index) {
				$(this).html(data);
				
				$(this).find('a').each(function (index) {
					$(this).attr('href', Envido.pathToApplicationRoot + $(this).attr('href'));
				});
			});
			
			if(Envido.Utils.notNullOrEmpty(Envido.selectedMenuItem)) {
				$('.topMenu > .' + Envido.selectedMenuItem).each(function (index) {
					$(this).addClass('current_list_item');
				});
			}
		};	
		
		return UI;
	}(Menu.UI || {}));
	
	Menu.initialize = function () {
		Envido.callServer(Envido.pathToApplicationRoot + 'data/menu.html', '', 'GET', 'html', Menu.UI.insertMenuOnPage, Envido.handleError);
	};
	
	return Menu;
}(window.Envido.Menu || {}));

Envido.ready(Envido.Menu.initialize);