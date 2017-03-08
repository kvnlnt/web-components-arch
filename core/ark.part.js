(function(ARK) {
    var Part = {};

    Part.collectAndInitialize = function(options) {
        var options = options || {};
        var Part = options.part;
        var parts = document.querySelectorAll(Part.selector);
        var partInstance;
        for (var i = 0; i < parts.length; i++) {
            partInstance = new Part({
                el: parts[i]
            });
            Ark.parts[partInstance.getId()] = partInstance;
        }
        return parts;
    };

    ARK.Part = Part;
    return ARK;
}(Ark || {}));