(function (window, document, undefined) {

ParabolicbayParameters = [
    {beta0: 10, C0: 0.036, C1: 1.011, C2: -0.047},
    {beta0: 15, C0: 0.050, C1: 0.998, C2: -0.049},
    {beta0: 20, C0: 0.055, C1: 1.029, C2: -0.088},
    {beta0: 25, C0: 0.054, C1: 1.083, C2: -0.142},
    {beta0: 30, C0: 0.045, C1: 1.146, C2: -0.194},
    {beta0: 35, C0: 0.029, C1: 1.220, C2: -0.253},
    {beta0: 40, C0: -0.000, C1: 1.326, C2: -0.332},
    {beta0: 45, C0: -0.039, C1: 1.446, C2: -0.412},
    {beta0: 50, C0: -0.088, C1: 1.588, C2: -0.507},
    {beta0: 55, C0: -0.151, C1: 1.756, C2: -0.611},
    {beta0: 60, C0: -0.227, C1: 1.930, C2: -0.706},
    {beta0: 65, C0: -0.315, C1: 2.113, C2: -0.800},
    {beta0: 70, C0: -0.409, C1: 2.284, C2: -0.873},
    {beta0: 75, C0: -0.505, C1: 2.422, C2: -0.909},
    {beta0: 80, C0: -0.600, C1: 2.520, C2: -0.906}
];

L.ParabolicBayShape = L.Layer.extend({
    _latlngs: null,

    options: {
        color: "rgba(0, 0, 0, 0.6)",
        weight: 0.5,
    },

    parabolicbayParam: ParabolicbayParameters,

    initialize: function (latLngs, options) {
        if (latLngs) {
            this._latLngs = latLngs;
            this._points = this._convetToPoints(this._latLngs);
        }
    },

    _convetToPoints: function (latLngs) {
        var map = this._map,
            result = [];

        latLngs.forEach(function(element) {
            result.push(map.latLngToLayerPoint(element));
        });

        return result;
    },

    _convertToLatlngs: function (points) {
        var map = this._map,
            result = [];

        points.forEach(function(element) {
            result.push(map.layerPointToLatLng(element));
        });

        return result;
    },

    // addTo: function (map) {
    //     console.log('add');
    //     this._map = map;

    //     return this;
    // },

    radToDeg: function (rad) {
        return rad * (180 / Math.PI);
    },

    degToRad: function (deg) {
        return deg * (Math.PI / 180);
    },

    onAdd: function (map) {
        var beta = this.getBeta(),
            R0 = this.getR0(),
            theta = 0;

        var pointRs = [];
        var points = this._points;

        for (var i=1; i<18; i++) {
            theta = i * 10;
            R = this.calculateOutput(R0, theta, beta);

            pointRs.push({
                x: R * Math.cos(this.degToRad(theta)) * Math.cos(this.degToRad(beta)) + points[0].x,
                y: R * Math.sin(this.degToRad(90 - (theta + beta))) + points[0].y
            });
        }

        var latLngs = this._convertToLatlngs(pointRs);
        var polyline = L.polyline(latLngs, {color: 'red'}).addTo(map);
    },

    getParams: function (beta0) {
        var result = {}, i, parabolicbayParam = this.parabolicbayParam;

        for (i=0; i < parabolicbayParam.length-1; i++) {
            if (beta0 >= parabolicbayParam[i].beta0 && beta0 < parabolicbayParam[i+1].beta0 ) {
                result = parabolicbayParam[i];
                break;
            }
        }

        return result;
    },

    calculateOutput: function (R0, theta, beta) {
        var Cx = this.getParams(beta),
            C0 = Cx.C0,
            C1 = Cx.C1,
            C2 = Cx.C2,
            R = 0;

        R = R0 * (C0 + (C1 * (beta / theta)) + (C2 * (beta / theta) ** 2));
        return R;
    },

    getBeta: function () {
        var points, dx1, dy1, m1, dx2, dy2, m2, tanBeta, beta;
        points = this._points;

        dx1 = points[0].x - points[1].x;
        dy1 = points[0].y - points[1].y;
        m1 = dy1 / dx1;

        dx2 = points[1].x - points[2].x;
        dy2 = points[1].y - points[2].y;
        m2 = dy2 / dx2;

        tanBeta = m1 - m2 / (1 + m1 * m2);
        beta = Math.abs(Math.atan(tanBeta)) * (180 / Math.PI);
        return beta;
    },

    getR0: function () {
        var points, dx1, dy1, dx2, dy2, dxy1;
        points = this._points;

        dx1 = points[0].x - points[1].x;
        dy1 = points[0].y - points[1].y;

        dxy1 = Math.sqrt(dx1 ** 2 + dy1 ** 2);

        return dxy1;
    }
})

L.parabolicbayshape = function(latlngs, options) {
    return new L.ParabolicBayShape(latlngs, options);
};


}(window, document));