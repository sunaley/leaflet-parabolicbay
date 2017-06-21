(function (window, document, undefined) {

L.ParabolicBayShape = L.Layer.extend({
    _latlngs: null,

    options: {
        color: "rgba(0, 0, 0, 0.6)",
        weight: 0.5,
    },

    initialize: function (latlngs, options) {
        if (latlangs) {
            this._latlngs = latlngs;
        }
    },

    onAdd: function (map) {

    },

    // addTo: function (map) {
	// 	this.remove();
	// 	this._map = map;

	// 	var container = this._container = this.onAdd(map),
	// 	    pos = this.getPosition(),
	// 	    corner = map._controlCorners[pos];

	// 	L.DomUtil.addClass(container, 'leaflet-control');

	// 	if (pos.indexOf('bottom') !== -1) {
	// 		corner.insertBefore(container, corner.firstChild);
	// 	} else {
	// 		corner.appendChild(container);
	// 	}

	// 	return this;
	},

})

L.parabolicbayshape = function(map, options) {
    return new L.ParabolicBayShape(map, options);
};


}(window, document));