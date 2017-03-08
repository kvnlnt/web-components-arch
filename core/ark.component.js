(function(ARK) {
    var Component = {};

    Component.collectAndInitialize = function(options) {
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

    ARK.Component = Component;
    return ARK;
}(Ark || {}));