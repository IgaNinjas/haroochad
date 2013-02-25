define([
		'store'
	], 
	function(store) {
		var gui = require('nw.gui');
		var win = gui.Window.get();

		var Model = Backbone.Model.extend({
			defaults: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				isFullscreen: false,
				zoom: 1,
			},

			initialize: function() {
				var opt = localStorage.getItem('Window');

				this.bind('change', function() {
					store.set('Window', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Window', this.toJSON());
				}
			},

			save: function() {
				this.set({
					x: win.x,
					y: win.y,
					width: win.width,
					height: win.height,
					isFullscreen: win.isFullscreen,
					isKioskMode: win.isKioskMode,
					zoom: win.zoom
				});
			}
		});

		return new Model();
});