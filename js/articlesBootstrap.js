window.Envido = window.Envido || {};

window.Envido.Articles = (function(Articles) {
	Articles.initialize = function() {
		Envido.pathToApplicationRoot = '../../';
	};
	
	Articles.initialize();
	
	return Articles;
}(window.Envido.Articles || {}));