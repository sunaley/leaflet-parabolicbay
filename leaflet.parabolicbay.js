(function (window, document, undefined) {

ParabolicbayParameters = [
    {beta0: 10, c0: 0.036, c1: 1.011, c2: -0.047},
    {beta0: 15, c0: 0.050, c1: 0.998, c2: -0.049},
    {beta0: 20, c0: 0.055, c1: 1.029, c2: -0.088},
    {beta0: 25, c0: 0.054, c1: 1.083, c2: -0.142},
    {beta0: 30, c0: 0.045, c1: 1.146, c2: -0.194},
    {beta0: 35, c0: 0.029, c1: 1.220, c2: -0.253},
    {beta0: 40, c0: -0.000, c1: 1.326, c2: -0.332},
    {beta0: 45, c0: -0.039, c1: 1.446, c2: -0.412},
    {beta0: 50, c0: -0.088, c1: 1.588, c2: -0.507},
    {beta0: 55, c0: -0.151, c1: 1.756, c2: -0.611},
    {beta0: 60, c0: -0.227, c1: 1.930, c2: -0.706},
    {beta0: 65, c0: -0.315, c1: 2.113, c2: -0.800},
    {beta0: 70, c0: -0.409, c1: 2.284, c2: -0.873},
    {beta0: 75, c0: -0.505, c1: 2.422, c2: -0.909},
    {beta0: 80, c0: -0.600, c1: 2.520, c2: -0.906}
];

L.ParabolicBayShape = L.Layer.extend({
    _latlngs: null,

    options: {
        color: "rgba(0, 0, 0, 0.6)",
        weight: 0.5,
    },

    parabolicbayParam: ParabolicbayParameter,

    initialize: function (latlngs, options) {
        if (latlangs) {
            this._latlngs = latlngs;
        }
    },

    onAdd: function (map) {

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

    calculateOutput: function (R0, theta) {
        var beta = this.getBeta(),
            Cx = this.getParams(beta),
            C0 = Cx.C0,
            C1 = Cx.C1,
            C2 = Cx.C2,
            R = 0;

        R = R0 * (C0 + (C1 * (beta / theta)) + (C2 * (beta / theta) ** 2));
        return R;
    },

    getBeta: function () {

    }
})

L.parabolicbayshape = function(latlngs, options) {
    return new L.ParabolicBayShape(latlngs, options);
};


}(window, document));