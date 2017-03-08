(function(ARK) {
    var Api = {};

    Api.fetch = function(path, cb) {
        cb({
            name: "Custom Component"
        });
    };

    ARK.Api = Api;
    return ARK;
}(Ark || {}));