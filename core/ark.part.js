(function(ARK) {
    var Part = {};

    Part.collectAndInitialize = function(options) {
        var options = options || {};
        var Component = options.component;
        var components = document.querySelectorAll(Component.selector);
        var componentInstance;
        for (var i = 0; i < components.length; i++) {
            componentInstance = new Component({
                el: components[i]
            });
            Ark.components[componentInstance.getId()] = componentInstance;
        }
        return components;
    };

    ARK.Part = Part;
    return ARK;
}(Ark || {}));