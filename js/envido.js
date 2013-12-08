window.Envido = (function (Envido) {
	Envido.pathToApplicationRoot = Envido.pathToApplicationRoot || '';
	
	Envido.Environment = (function (Environment) {
		Environment.Device = Environment.Device || {};
		Environment.detect = function () {
			Environment.Device.isIPhone = Envido.Utils.notNullOrEmpty(navigator.userAgent.match(/(iPhone)/gi));
			Environment.Device.isMobile = Envido.Utils.notNullOrEmpty(navigator.userAgent.match(/(android|iPad|iPhone|iPod)/gi));
			
			Environment.isLocalhost = -1 < window.location.hostname.indexOf('localhost');
		};
		
		return Environment;
	}(Envido.Environment || {}));
	
	Envido.Events = (function (Events) {
		Events.eventHandlers = Events.eventHandlers || {};
		
		Events.fire = function (event, data) {
			if (Envido.Utils.notNullOrEmpty(event) && Envido.Utils.notNullOrEmpty(Events.eventHandlers[event])) {
				for (var key in Events.eventHandlers[event]) {
					Events.eventHandlers[event][key].func.apply({}, [data].concat(Events.eventHandlers[event][key].args));
				}
			}
		};
		
		Events.on = function (event, handler) {
			var args = [];

			for (var i = 2; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			
			if (event && handler) {
				Events.eventHandlers[event] = Events.eventHandlers[event] || [];
				Events.eventHandlers[event].push({ args: args, func: handler });
			}
			
			return this;
		};
		
		return Events;
	}(Envido.Events || {}));
	
	Envido.Plugins = (function (Plugins) {
		Plugins.Google = (function (Google) {
			Google.Analytics = (function () {
				return {
					initialize: function (trackerId, scriptUrl) {
						window.GoogleAnalyticsObject = 'ga';
						window.ga = window.ga || function () {
							(window.ga.q = window.ga.q || []).push(arguments);
						},
						window.ga.l = (new Date()) * 1;
						
						var _script = document.createElement('script'),
							_firstScript = document.getElementsByTagName('script')[0];
						
						_script.async = true;
						_script.src = Envido.Utils.notNullOrEmpty(scriptUrl) ? scriptUrl : '//www.google-analytics.com/analytics.js';
						
						_firstScript.parentNode.insertBefore(_script, _firstScript);

						window.ga('create', trackerId, 'envido.se');
						window.ga('send', 'pageview');
					}
				};
			}());
			
			return Google;
		}(Plugins.Google || {}));
		
		return Plugins;
	}(Envido.Plugins || {}));
	
	Envido.UI = (function (UI) {
		UI.dropDownData = UI.dropDownData || [];
		UI.imageData = UI.imageData || [];
		
		UI.genericDataCallback = function (data) {
			$.each(data, function (index) {
			});
		};
		
		UI.center = function (element) {
			element.css("left", ( $(window).width() - element.width() ) / 2 + $(window).scrollLeft() + "px");
		};
		
		UI.createDialog = function (markup, height, width, onClose) {
			return $('<div></div>').appendTo(document.body).html(markup).dialog({
				close: onClose,
				height: height,
				modal: true,
				position: {my: 'left top', at: 'left top', of: document.body},
				width: width
			});
		};
		
		UI.createDropDown = function (jqSelectElement, url, params, callbackFunction) {
			return; /*Unused function - Code kept for future use*/
			
			if(jqSelectElement.children().length > 1) {
				return;
			}
			
			if(UI.dropDownData[params.q]) {
				jqSelectElement.append($('<option></option').val('-').html(params.defaultText));
				$.each(UI.dropDownData[params.q], function (index) {
					var option = $('<option></option').val(this.value).html(this.key);
					if(this.value == params.selected) {
						option.attr('selected', 'selected');
					}
					jqSelectElement.append(option);
				});
				jqSelectElement.selectBoxIt({ theme: 'jqueryui' });
			}
			else {
				Envido.callServer(url, {q: params.q}, 'GET', 'json', callbackFunction, Envido.handleError);
				setTimeout(function () { UI.createDropDown(jqSelectElement, url, params, callbackFunction); }, 500);
			}
			
			return jqSelectElement;
		};
		
		UI.createImageGallery = function (jqDivContainerElement, url, imageDataIndex, callbackFunction) {
			if(jqDivContainerElement.children().length > 1) {
				return;
			}
			
			if(Envido.Utils.notNullOrEmpty(UI.imageData[imageDataIndex])) {
				$.each(UI.imageData[imageDataIndex], function (index) {
					jqDivContainerElement.append(this);
				});
				
				jqDivContainerElement.imagegallery();
			}
			else {
				Envido.callServer(url, '', 'GET', 'html', callbackFunction, Envido.handleError);
				setTimeout(function () { Envido.UI.createImageGallery(jqDivContainerElement, url, imageDataIndex, callbackFunction); }, 500);
			}
			
			return jqDivContainerElement;
		};
		
		UI.createImageSlider = function (jqDivContainerElement, url, imageDataIndex, height, width, callbackFunction) {
			if(jqDivContainerElement.children().length > 1) {
				return;
			}
			
			if(Envido.Utils.notNullOrEmpty(UI.imageData[imageDataIndex])) {
				$.each(UI.imageData[imageDataIndex], function (index) {
					jqDivContainerElement.append(this);
				});
				
				jqDivContainerElement.slidesjs({
					height: height,
					navigation: {
						active: false
					},
					pagination: {
						active: false
					},
					play: {
						active: false,
						auto: true,
						effect: 'fade',
						interval: 3000,
						restartDelay: 3000
					},
        			width: width
				});
			}
			else {
				Envido.callServer(url, '', 'GET', 'html', callbackFunction, Envido.handleError);
				setTimeout(function () { Envido.UI.createImageSlider(jqDivContainerElement, url, imageDataIndex, height, width, callbackFunction); }, 500);
			}
			
			return jqDivContainerElement;
		};
		
		UI.createPagedImageGallery = function (jqDivContainerElement, imageDataIndex) {
			if(jqDivContainerElement.children().length > 1) {
				return;
			}
			
			if(Envido.Utils.notNullOrEmpty(UI.imageData[imageDataIndex])) {
				$.each(UI.imageData[imageDataIndex], function (index) {
					jqDivContainerElement.append(this);
				});
				
				jqDivContainerElement.imagegallery();
			}
			else {
				setTimeout(function () { Envido.UI.createPagedImageGallery(jqDivContainerElement, imageDataIndex); }, 500);
			}
			
			return jqDivContainerElement;
		};
		
		UI.windowHeight = function () {
			return $(window).height();
		};
		
		UI.windowWidth = function () {
			return $(window).width();
		};
		
		return UI;
	}(Envido.UI || {}));
	
	Envido.Utils = (function (Utils) {
		Utils.getSelectedDropDownValue = function (jqSelectElement) {
			return null; /*Unused function - Code kept for future use*/
			
			var selectedValue = jqSelectElement.find('option:selected').val();
			if(selectedValue == '-') {
				return null;
			}
			
			return selectedValue;
		};
		
		Utils.getQueryStringParameter = function (parameter) {
			parameter = parameter.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + parameter + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.search);
			
			if(results != null) {
				results =  decodeURIComponent(results[1].replace(/\+/g, " "));
			}
			
			return results;
		};
		
        Utils.notNullOrEmpty = function (str) {
            return str != null && str !== 'undefined' && str !== '';
        };
		
        Utils.notNullOrUndefinedFunction = function (func) {
            return func != null && func !== 'undefined' && typeof func === 'function';
        };

        return Utils;
    }(Envido.Utils || {}));
	
	Envido.callServer = function (url, data, requestMethod, dataType, success, error) {
		var utils = Envido.Utils;
		
		$.ajax({
			url: url,
			type: requestMethod,
			data: data,
			dataType: dataType,
			success: function (data) {
				if(utils.notNullOrUndefinedFunction(success)) {
					success(data);
				}
				else {
					return data;
				}
			},
			error: function (error) {
				if(utils.notNullOrUndefinedFunction(error)) {
					error(error);
				}
			}
		});
	};
	
	Envido.handleError = function (error) {
		console.log(error);
	};
	
	Envido.initialize = function () {
		Envido.loadDependencies();
		Envido.Environment.detect();
		
		if (!Envido.Environment.isLocalhost) {
			Envido.Plugins.Google.Analytics.initialize('UA-44948166-2', '//www.google-analytics.com/analytics.js');
		}
	};
	
	Envido.loadDependencies = function () {
		Envido.loadStyle(Envido.pathToApplicationRoot + 'lib/jquery-ui.base-1.10.1.css', null);
		Envido.loadStyle(Envido.pathToApplicationRoot + 'lib/jquery-ui.smoothness-1.10.3.css', null);
		Envido.loadStyle(Envido.pathToApplicationRoot + 'lib/jquery.selectBoxIt-2.9.0.css', null);
		Envido.loadStyle(Envido.pathToApplicationRoot + 'css/envido.css', null);
		Envido.loadStyle(Envido.pathToApplicationRoot + 'css/menu.css', null);
		
		Envido.loadScript(Envido.pathToApplicationRoot + 'lib/jquery-ui-1.10.3.min.js', function () {
			Envido.loadScript(Envido.pathToApplicationRoot + 'lib/jquery.selectBoxIt-2.9.0.min.js', null);
		});
		
		Envido.loadScript(Envido.pathToApplicationRoot + 'js/menu.js', null);
	};
	
	Envido.loadScript = function (url, onLoad) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState == 'loaded' || script.readyState == 'complete') {
					script.onreadystatechange = null;

					if (onLoad != null) {
						onLoad();
					}
				}
			};
		}
		else {
			if (onLoad != null) {
				script.onload = onLoad;
			}
		}

		document.getElementsByTagName('head')[0].appendChild(script);
	};
	
	Envido.loadStyle = function (url, onLoad) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;

		if (link.readyState) {
			link.onreadystatechange = function () {
				if (link.readyState == 'loaded' || link.readyState == 'complete') {
					link.onreadystatechange = null;

					if (onLoad != null) {
						onLoad();
					}
				}
			};
		}
		else {
			if (onLoad != null) {
				link.onload = onLoad;
			}
		}

		document.getElementsByTagName('head')[0].appendChild(link);
	};
	
	//ToDo: Require jQuery?
	Envido.ready = $(document).ready;
	
	Envido.initialize();
	
	return Envido;
}(window.Envido || {}));

Envido.ready(function () {
	$('.banner').on('click', function () {
		window.location.href = Envido.pathToApplicationRoot + '../';
	});
});