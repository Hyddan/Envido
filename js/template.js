window.Envido.Template = (function(Template) {
	Template.loadDependencies = function () {
	};
	
	Template.initialize = function() {
	};
	
	Template.loadDependencies();
	
	return Template;
}(window.Envido.Template || {}));

Envido.ready(Envido.Template.initialize);