(function(ARK) {
    var Api = {};

    Api.get = function(path, cb) {
        var request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                cb(null, data);
            } else {
                cb("Error", null);
            }
        };
        request.onerror = function() {
            cb("Error", null);
        };
        request.send();
    };

    ARK.Api = Api;
    return ARK;
}(Ark || {}));