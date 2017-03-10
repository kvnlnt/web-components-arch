(function(ARK) {
    var Page = {};

    // These should be defined onload in the html document
    Page.theme = {}; // should be provided on load
    Page.template ="<div class=\"layout\">There was an error</div>";
    Page.templateData = {};
    Page.css = [];
    Page.layout = {};

    Page.init = function(){
        Ark.Css.add(Page.css);
        Page.render(Page.template, Page.templateData);
        Page.layoutParts(Page.layout);
        Page.initializeParts();
        Ark.Events.dispatch(Ark.EVENTS.PAGE_READY);
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
        Ark.Events.dispatch(Ark.EVENTS.PARTS_READY);
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

    Page.layoutParts = function(config){
        var target;
        var part;
        for(var i in config){
            target = document.querySelector(i);
            for(var j in config[i].parts){
                part = document.getElementById(config[i].parts[j]);
                target.appendChild(part);
            }
        }
    };

    Ark.Events.addEventListener(Ark.EVENTS.ARK_READY, function() {
        Page.init();
    });

    ARK.Page = Page;
    return ARK;
}(Ark || {}));