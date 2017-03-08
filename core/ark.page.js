(function(ARK) {
    var Page = {};

    Page.init = function(options){
        var options = options || {};
        Page.theme = options.theme || {};
        Page.css = options.css || [];
        Page.template = options.template || null;
        Page.templateData = options.templateData || {};
        Page.layout = options.layout || {};

        document.addEventListener(Ark.events.READY, function() {
            // render css
            Ark.Css.add(Page.css);
            Page.render(Page.template, Page.templateData);
            Page.layoutParts(Page.layout);
            Page.initializeParts();
        });
    };

    Page.initializeParts = function() {
        var part;
        for(var x in ARK.Parts){
            var part = ARK.Parts[x];
            var parts = document.querySelectorAll(part.selector);
            var partInstance;
            for (var y = 0; y < parts.length; y++) {
                partInstance = new part({
                    el: parts[y]
                });
                Ark.parts[partInstance.getId()] = partInstance;
                Ark.Css.add(part.css());
                partInstance.init();
            }
        }
        return parts;
    };

    Page.render = function(template, data){
        var renderedTemplate = Ark.Template.compile(template, data);
        var pageWrapper = document.createElement("div");
        pageWrapper.setAttribute("id", "Page");
        pageWrapper.innerHTML = renderedTemplate;
        document.body.insertBefore(pageWrapper, document.body.firstChild);
        return renderedTemplate;
    };

    Page.layoutParts = function(layout){
        var target;
        var part;
        for(var i in layout){
            target = document.getElementById(i);
            for(var j in layout[i]){
                part = document.getElementById(layout[i][j]);
                target.appendChild(part);
            }
        }
    };

    ARK.Page = Page;
    return ARK;
}(Ark || {}));